import * as noteRepository from '../repositories/noteRepository'
import { Notes } from "@prisma/client";
import {CreateNoteData} from "../types/noteTypes"
import bcrypt from "bcrypt";
import Cryptr from "cryptr"
const cryptr = new Cryptr(process.env.TOKEN_SECRET || '123');


export async function createNote(userData:CreateNoteData, userId:number) {
    if(userId === undefined){
        throw ({type:"unprocessable entity", mensage:"Token is missing"})
    }

    const isTitleAlreadyInUse = await noteRepository.findByTitleAndUserId(userData.title, userId)
    if (isTitleAlreadyInUse){
        throw ({type:"conflict", mensage:"You already have a note with this title"})
    }

    await noteRepository.createnNote(userData, userId);
}

export async function getByUser(userId:number) {
    const notes = await noteRepository.findByUserId(userId);

    return notes;
}

export async function getById(userId:number, id:number) {
    const note = await noteRepository.findById(id);

    if(note === null){
        throw ({type:"not_found", mensage:"This note does not exist"});
    }

    if( note.userId !== userId){
        throw ({type:"unauthorized", mensage:"This note does not belong to you"})
    }

    return note;
}

export async function deleteNote(userId:number, id:number) {
    const note = await noteRepository.findById(id);

    if(note === null){
        throw ({type:"not_found", mensage:"This note does not exist"});
    }

    if(note !== null && note.userId !== userId){
        throw ({type:"unauthorized", mensage:"This note does not belong to you"})
    }

    await noteRepository.deleteById(id);

    return note;
}

