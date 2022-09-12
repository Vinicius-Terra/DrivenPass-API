import userRepositore from '../repositories/userRepository'
import { User } from "@prisma/client";
import {SiginUserData, LoginUserData} from "../types/userTypes"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(userData:SiginUserData) {
    
    const {email} = userData;
    const doesEmailAlreadyExist = await userRepositore.findByEmail(email)
    
    if(doesEmailAlreadyExist){
        throw ({type:"conflict", mensage:"Email already registered"})
    }

    delete userData.confirmPassword;
    const hashedPassword = hashUserPassword(userData.password);
    userData.password = hashedPassword;

    await userRepositore.createUser(userData);
}

function hashUserPassword (password: string) : string{
    const hashedPassword : string = bcrypt.hashSync(password, 8);
    return hashedPassword
};
  
export async function login(user:LoginUserData) {

    const account:User | null = await userRepositore.findByEmail(user.email);
    if(account == null){
        throw ({type:"unauthorized", mensage:"Email or password are incorrect"})
    }

    const isPasswordValid : boolean = bcrypt.compareSync(user.password, account.password);
    if(isPasswordValid === false){
        throw ({type:"unauthorized", mensage:"Email or password are incorrect"})
    }

    return generateToken(account.id);
}

function generateToken(id: number) {
    const SECRET = process.env.TOKEN_SECRET || '123';

    const token : string = jwt.sign({userId: id}, SECRET, {expiresIn: "1d"})
    
    return token
};