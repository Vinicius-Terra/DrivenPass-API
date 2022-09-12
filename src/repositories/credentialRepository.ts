import { prisma } from "../config/database";
import {CreateCredentialData} from "../types/credentialTypes"


export async function createCredential(createCredential:CreateCredentialData, userId:number) {
    
    return await prisma.credentials.create({
        data: {...createCredential, userId},
      });
    
}

export async function findByTitleAndUserId (title: string, userId:number){
    const credential = await prisma.credentials.findUnique({
        where:{
            userId_title: {userId, title}
        }
    });

    return credential
}

export async function findByUserId (userId:number){
    const credentials = await prisma.credentials.findMany({
        where:{
            userId
        }
    });

    return credentials
}

export async function findById (id:number){
    const credentials = await prisma.credentials.findUnique({
        where:{
            id
        }
    });

    return credentials
}


export async function deleteById (id:number){
    return await prisma.credentials.delete({
        where:{
            id
        }
    });
}