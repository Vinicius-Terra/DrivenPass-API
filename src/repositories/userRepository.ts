import { prisma } from "../config/database";
import {SiginUserData, LoginUserData} from "../types/userTypes"

async function createUser(userData:SiginUserData) {
    return await prisma.user.create({
        data: userData,
      });
}

export async function findByEmail (email: string){
    const account = await prisma.user.findUnique({
        where:{
            email
        }
    });
    return account
}

export default {
    createUser,
    findByEmail
};