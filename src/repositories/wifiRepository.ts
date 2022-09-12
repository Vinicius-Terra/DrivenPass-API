import { prisma } from "../config/database";
import { CreateWifiData } from "../types/wifiTypes"


export async function createWifi(CreateWifiData:CreateWifiData, userId:number) {
    
    return await prisma.wiFi.create({
        data: {...CreateWifiData, userId},
      });
    
}

export async function findByTitleAndUserId (title: string, userId:number){
    const wifi = await prisma.wiFi.findFirst({
        where:{
            userId, 
            title
        }
    });

    return wifi
}

export async function findByUserId (userId:number){
    const wifis = await prisma.wiFi.findMany({
        where:{
            userId
        }
    });

    return wifis
}

export async function findById (id:number){
    const wifis = await prisma.wiFi.findUnique({
        where:{
            id
        }
    });

    return wifis
}


export async function deleteById (id:number){
    return await prisma.wiFi.delete({
        where:{
            id
        }
    });
}

