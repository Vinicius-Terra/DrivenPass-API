import { Request, Response } from 'express';
import * as userService from '../services/userService'
import {SignupUserData, LoginUserData} from "../types/userTypes"

export async function createUser(req: Request, res: Response) {
  const userData:SignupUserData = req.body;
  await userService.createUser(userData);
  res.sendStatus(200);
}

export async function login(req: Request, res: Response) {
  const user:LoginUserData = req.body;
  
  const token = await userService.login(user);
  res.send(token).status(200);
}

