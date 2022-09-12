import { Request, Response } from 'express';
import {CreateWifiData} from '../types/wifiTypes'
import * as wifiService from '../services/wifiService'

export async function createWifi(req: Request, res: Response) {
  const {userId} = res.locals.userId;
  const CreateWifiData:CreateWifiData = req.body;
  await wifiService.createWifi(CreateWifiData, userId)
  res.sendStatus(200)
}

export async function getByUser(req: Request, res: Response) {
  const {userId} = res.locals.userId;
  const wifis = await wifiService.getByUser(userId);
  res.status(200).send(wifis);
}

export async function getById(req: Request, res: Response) {
  const {userId} = res.locals.userId;
  const { id } = req.params;
  const wifis = await wifiService.getById(userId, Number(id));
  res.status(200).send(wifis);
}

export async function deleteWifi(req: Request, res: Response) {
  const {userId} = res.locals.userId;
  const { id } = req.params;
  const wifis = await wifiService.deleteWifi(userId, Number(id));
  res.status(200).send(wifis);
}