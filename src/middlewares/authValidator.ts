import { NextFunction, Request, Response } from 'express';
import jwt  from "jsonwebtoken";

const SECRET = process.env.TOKEN_SECRET || '123';

export async function validateToken (req:Request, res:Response, next:NextFunction){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(token === null || token === undefined){
        throw ({type:'unprocessable entity', mensage:"Token is missing"})
    } 

    
    jwt.verify(token, SECRET, (err, id) => {
        if(err){
            throw ({type:'unauthorized'})
        }
        else{
        res.locals.userId = id;
        next();
        }
        
    });
};