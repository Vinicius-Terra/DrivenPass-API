import { Router } from 'express';
import {
    createWifi,
    getByUser,
    getById,
    deleteWifi
} from '../controllers/wifiController';
import { validateSchemaMiddleware } from './../middlewares/validateSchema';

const wifiRouter = Router();

wifiRouter.get('/wifis', getByUser);

wifiRouter.get('/wifi/:id', getById);

wifiRouter.post('/wifi', createWifi);

wifiRouter.delete('/wifi/:id', deleteWifi);

export default wifiRouter;
