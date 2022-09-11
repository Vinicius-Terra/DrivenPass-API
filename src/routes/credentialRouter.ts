import { Router } from 'express';
import {
    createCredential,
    getByUser,
    getById,
    deleteCredential
} from '../controllers/credentialController';
import { validateSchemaMiddleware } from './../middlewares/validateSchema';

const credentialRouter = Router();

credentialRouter.get('/credentials', getByUser);

credentialRouter.get('/credential/:id', getById);

credentialRouter.post('/credential', createCredential);

credentialRouter.delete('/credential/:id', deleteCredential);

export default credentialRouter;