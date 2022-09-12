import { prisma } from "../config/database";
import {CreateCardData} from "../types/cardTypes"


export async function createCard(createCredential:CreateCardData, userId:number) {
    
    return await prisma.cards.create({
        data: {...createCredential, userId},
      });
}

export async function findByTitleAndUserId (title: string, userId:number){
    const card = await prisma.cards.findUnique({
        where:{
            userId_title: {userId, title}
        }
    });

    return card
}

export async function findByUserId (userId:number){
    const cards = await prisma.cards.findMany({
        where:{
            userId
        }
    });

    return cards
}

export async function findById (id:number){
    const card = await prisma.cards.findUnique({
        where:{
            id
        }
    });

    return card
}


export async function deleteById (id:number){
    return await prisma.cards.delete({
        where:{
            id
        }
    });

}