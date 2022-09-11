import { Router } from 'express';
import {
    createNote,
    getByUser,
    getById,
    deleteNote
} from '../controllers/noteController';
import { validateSchemaMiddleware } from './../middlewares/validateSchema';

const noteRouter = Router();

noteRouter.get('/notes', getByUser);

noteRouter.get('/note/:id', getById);

noteRouter.post('/note', createNote);

noteRouter.delete('/note/:id', deleteNote);

export default noteRouter;
