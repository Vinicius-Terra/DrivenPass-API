import * as credentialRepository from '../repositories/credentialRepository'
import { Credentials } from "@prisma/client";
import {CreateCredentialData} from "../types/credentialTypes"
import bcrypt from "bcrypt";
import Cryptr from "cryptr"
const cryptr = new Cryptr('myTotallySecretKey');


function encryptPassword (password: string) : string{
    const encryptPassword : string = cryptr.encrypt(password);
    return encryptPassword
};

export async function createCredential(userData:CreateCredentialData, userId:number) {
    console.log(userId)
    if(userId === undefined){
        throw ({type:"unprocessable entity", mensage:"Token is missing"})
    }

    const isTitleAlreadyInUse = await credentialRepository.findByTitleAndUserId(userData.title, userId)
    if (isTitleAlreadyInUse){
        throw ({type:"conflict", mensage:"You already have a credencial with this title"})
    }

    const encryptedPassword = encryptPassword(userData.password);
    userData.password = encryptedPassword;

    await credentialRepository.createCredential(userData, userId);
}

export async function getByUser(userId:number) {
    const credencials = await credentialRepository.findByUserId(userId);
    if(credencials.length > 0){
        decryptPasswords(credencials)
    }

    return credencials;
}

function decryptPasswords(credencials:Credentials[]){

    credencials.forEach(cred => {
        cred.password = cryptr.decrypt(cred.password);
    });

}

export async function getById(userId:number, id:number) {
    const credencial = await credentialRepository.findById(id);

    if(credencial === null){
        throw ({type:"not_found", mensage:"This credential does not exist"});
    }

    if( credencial.userId !== userId){
        throw ({type:"unauthorized", mensage:"This credential does not belong to you"})
    }
    const decryptedPassword = cryptr.decrypt(credencial.password);
    credencial.password = decryptedPassword

    return credencial;
}

export async function deleteCredential(userId:number, id:number) {
    const credencial = await credentialRepository.findById(id);

    if(credencial === null){
        throw ({type:"not_found", mensage:"This credential does not exist"});
    }

    if(credencial !== null && credencial.userId !== userId){
        throw ({type:"unauthorized", mensage:"This credential does not belong to you"})
    }

    await credentialRepository.deleteById(id);

    return credencial;
}

