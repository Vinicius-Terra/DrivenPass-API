import { Router } from 'express';
import {
    createCard,
    getByUser,
    getById,
    deleteCard
} from '../controllers/cardController';
import { validateSchemaMiddleware } from './../middlewares/validateSchema';

const cardRouter = Router();

cardRouter.get('/cards', getByUser);

cardRouter.get('/card/:id', getById);

cardRouter.post('/card', createCard);

cardRouter.delete('/card/:id', deleteCard);

export default cardRouter;

