import { Router } from 'express';
import {
    createWifi,
    getByUser,
    getById,
    deleteWifi
} from '../controllers/wifiController';
import { validateSchemaMiddleware } from './../middlewares/validateSchema';
import { wifiSchema } from '../schemas/wifiSchema'
import { validateToken } from '../middlewares/authValidator'

const wifiRouter = Router();

wifiRouter.get('/wifis', validateToken, getByUser);

wifiRouter.get('/wifi/:id', validateToken, getById);

wifiRouter.post('/wifi', validateToken, validateSchemaMiddleware(wifiSchema), createWifi);

wifiRouter.delete('/wifi/:id', validateToken, deleteWifi);

export default wifiRouter;
