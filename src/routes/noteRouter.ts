import { Router } from 'express';
import {
    createNote,
    getByUser,
    getById,
    deleteNote
} from '../controllers/noteController';
import { validateSchemaMiddleware } from './../middlewares/validateSchema';
import { noteSchema } from '../schemas/noteSchema'
import { validateToken } from '../middlewares/authValidator'

const noteRouter = Router();

noteRouter.get('/notes', validateToken, getByUser);

noteRouter.get('/note/:id', validateToken, getById);

noteRouter.post('/note', validateToken, validateSchemaMiddleware(noteSchema), createNote);

noteRouter.delete('/note/:id', validateToken, deleteNote);

export default noteRouter;
