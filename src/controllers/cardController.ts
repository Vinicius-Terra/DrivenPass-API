import { Request, Response } from 'express';
import {CreateCardData} from '../types/cardTypes'
import * as cardService from '../services/cardService'

export async function createCard(req: Request, res: Response) {
  const {userId} = res.locals.userId;
  const credentialData:CreateCardData = req.body;
  console.log(await cardService.createCard(credentialData, userId))
  res.sendStatus(200)
}

export async function getByUser(req: Request, res: Response) {
  const {userId} = res.locals.userId;
  const credentials = await cardService.getByUser(userId);
  res.status(200).send(credentials);
}

export async function getById(req: Request, res: Response) {
  const {userId} = res.locals.userId;
  const { id } = req.params;
  const credentials = await cardService.getById(userId, Number(id));
  res.status(200).send(credentials);
}

export async function deleteCard(req: Request, res: Response) {
  const {userId} = res.locals.userId;
  const { id } = req.params;
  const credentials = await cardService.deleteCard(userId, Number(id));
  res.status(200).send(credentials);
}
