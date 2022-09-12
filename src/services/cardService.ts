import * as cardRepository from '../repositories/cardRepository'
import { Cards } from "@prisma/client";
import {CreateCardData} from "../types/cardTypes"
import bcrypt from "bcrypt";
import Cryptr from "cryptr"
const cryptr = new Cryptr(process.env.TOKEN_SECRET || '123');


function encryptPassword (password: string) : string{
    const encryptPassword : string = cryptr.encrypt(password);
    return encryptPassword
};

export async function createCard(userData:CreateCardData, userId:number) {

    if(userId === undefined){
        throw ({type:"unprocessable entity", mensage:"Token is missing"})
    }

    const isTitleAlreadyInUse = await cardRepository.findByTitleAndUserId(userData.title, userId)
    if (isTitleAlreadyInUse){
        throw ({type:"conflict", mensage:"You already have a card with this title"})
    }

    const encryptedPassword = encryptPassword(userData.password);
    userData.password = encryptedPassword;

    format(userData);

    await cardRepository.createCard(userData, userId);
}

function format(userData:CreateCardData){

    if(userData.isVirtual !== null && userData.isVirtual.toString() === "false"){
        userData.isVirtual = false;
    }
    else if(userData.isVirtual !== null && userData.isVirtual.toString() === "true"){
        userData.isVirtual = false;
    }

    userData.securityCode = Number(userData.securityCode);
}

export async function getByUser(userId:number) {
    const cards = await cardRepository.findByUserId(userId);
    if(cards.length > 0){
        decryptPasswords(cards)
    }

    return cards;
}

function decryptPasswords(cards:Cards[]){

    cards.forEach(card => {
        card.password = cryptr.decrypt(card.password);
    });

}

export async function getById(userId:number, id:number) {
    const card = await cardRepository.findById(id);

    if(card === null){
        throw ({type:"not_found", mensage:"This card does not exist"});
    }

    if( card.userId !== userId){
        throw ({type:"unauthorized", mensage:"This card does not belong to you"})
    }
    const decryptedPassword = cryptr.decrypt(card.password);
    card.password = decryptedPassword

    return card;
}

export async function deleteCard(userId:number, id:number) {
    const card = await cardRepository.findById(id);

    if(card === null){
        throw ({type:"not_found", mensage:"This card does not exist"});
    }

    if(card !== null && card.userId !== userId){
        throw ({type:"unauthorized", mensage:"This card does not belong to you"})
    }

    await cardRepository.deleteById(id);

    return card;
}

