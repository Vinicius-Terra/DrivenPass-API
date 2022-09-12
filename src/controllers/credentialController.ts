import { Request, Response } from 'express';
import {CreateCredentialData} from '../types/credentialTypes'
import * as credentialService from '../services/credentialService'

export async function createCredential(req: Request, res: Response) {
  const {userId} = res.locals.userId;
  const credentialData:CreateCredentialData = req.body;
  await credentialService.createCredential(credentialData, userId)
  res.sendStatus(200)
}

export async function getByUser(req: Request, res: Response) {
  const {userId} = res.locals.userId;
  const credentials = await credentialService.getByUser(userId);
  res.status(200).send(credentials);
}

export async function getById(req: Request, res: Response) {
  const {userId} = res.locals.userId;
  const { id } = req.params;
  const credentials = await credentialService.getById(userId, Number(id));
  res.status(200).send(credentials);
}

export async function deleteCredential(req: Request, res: Response) {
  const {userId} = res.locals.userId;
  const { id } = req.params;
  const credentials = await credentialService.deleteCredential(userId, Number(id));
  res.status(200).send(credentials);
}