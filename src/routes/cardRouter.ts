import { Router } from 'express';
import {
    createCard,
    getByUser,
    getById,
    deleteCard
} from '../controllers/cardController';
import { validateSchemaMiddleware } from './../middlewares/validateSchema';
import { cardSchema } from '../schemas/cardSchema'
import { validateToken } from '../middlewares/authValidator'

const cardRouter = Router();

cardRouter.get('/cards', validateToken, getByUser);

cardRouter.get('/card/:id', validateToken, getById);

cardRouter.post('/card', validateToken, validateSchemaMiddleware(cardSchema), createCard);

cardRouter.delete('/card/:id', validateToken, deleteCard);

export default cardRouter;

