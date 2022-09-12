import { Request, Response } from 'express';
import {CreateNoteData} from '../types/noteTypes'
import * as noteService from '../services/noteService'

export async function createNote(req: Request, res: Response) {
  const {userId} = res.locals.userId;
  const noteData:CreateNoteData = req.body;
  console.log(await noteService.createNote(noteData, userId))
  res.sendStatus(200)
}

export async function getByUser(req: Request, res: Response) {
  const {userId} = res.locals.userId;
  const notes = await noteService.getByUser(userId);
  res.status(200).send(notes);
}

export async function getById(req: Request, res: Response) {
  const {userId} = res.locals.userId;
  const { id } = req.params;
  const notes = await noteService.getById(userId, Number(id));
  res.status(200).send(notes);
}

export async function deleteNote(req: Request, res: Response) {
  const {userId} = res.locals.userId;
  const { id } = req.params;
  const notes = await noteService.deleteNote(userId, Number(id));
  res.status(200).send(notes);
}
