import { prisma } from "../config/database";
import { CreateNoteData } from "../types/noteTypes"


export async function createnNote(CreateNoteData:CreateNoteData, userId:number) {
    
    return await prisma.notes.create({
        data: {...CreateNoteData, userId},
      });
    
}

export async function findByTitleAndUserId (title: string, userId:number){
    const note = await prisma.notes.findUnique({
        where:{
            userId_title: {userId, title}
        }
    });

    return note
}

export async function findByUserId (userId:number){
    const notes = await prisma.notes.findMany({
        where:{
            userId
        }
    });

    return notes
}

export async function findById (id:number){
    const notes = await prisma.notes.findUnique({
        where:{
            id
        }
    });

    return notes
}


export async function deleteById (id:number){
    return await prisma.notes.delete({
        where:{
            id
        }
    });
}
