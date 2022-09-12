import * as wifiRepository from '../repositories/wifiRepository'
import { WiFi } from "@prisma/client";
import {CreateWifiData} from "../types/wifiTypes"
import bcrypt from "bcrypt";
import Cryptr from "cryptr"
const cryptr = new Cryptr(process.env.TOKEN_SECRET || '123');


function encryptPassword (password: string) : string{
    const encryptPassword : string = cryptr.encrypt(password);
    return encryptPassword
};

export async function createWifi(CreateWifiData:CreateWifiData, userId:number) {
    if(userId === undefined){
        throw ({type:"unprocessable entity", mensage:"Token is missing"})
    }

    const encryptedPassword = encryptPassword(CreateWifiData.password);
    CreateWifiData.password = encryptedPassword;

    await wifiRepository.createWifi(CreateWifiData, userId);
}

export async function getByUser(userId:number) {
    const wifis = await wifiRepository.findByUserId(userId);
    if(wifis.length > 0){
        decryptPasswords(wifis)
    }

    return wifis;
}

function decryptPasswords(wifis:WiFi[]){

    wifis.forEach(wifi => {
        wifi.password = cryptr.decrypt(wifi.password);
    });

}

export async function getById(userId:number, id:number) {
    const wifi = await wifiRepository.findById(id);

    if(wifi === null){
        throw ({type:"not_found", mensage:"This wifi does not exist"});
    }

    if( wifi.userId !== userId){
        throw ({type:"unauthorized", mensage:"This wifi does not belong to you"})
    }
    const decryptedPassword = cryptr.decrypt(wifi.password);
    wifi.password = decryptedPassword

    return wifi;
}

export async function deleteWifi(userId:number, id:number) {
    const wifi = await wifiRepository.findById(id);

    if(wifi === null){
        throw ({type:"not_found", mensage:"This wifi does not exist"});
    }

    if(wifi !== null && wifi.userId !== userId){
        throw ({type:"unauthorized", mensage:"This wifi does not belong to you"})
    }

    await wifiRepository.deleteById(id);

    return wifi;
}

