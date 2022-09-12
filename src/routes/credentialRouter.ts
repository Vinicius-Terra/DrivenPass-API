import { Router } from 'express';
import {
    createCredential,
    getByUser,
    getById,
    deleteCredential
} from '../controllers/credentialController';
import { validateSchemaMiddleware } from './../middlewares/validateSchema';
import { credentialSchema } from '../schemas/credentialSchema'
import { validateToken } from '../middlewares/authValidator'


const credentialRouter = Router();

credentialRouter.get('/credentials', validateToken, getByUser);

credentialRouter.get('/credential/:id',validateToken, getById);

credentialRouter.post('/credential', validateSchemaMiddleware(credentialSchema), validateToken, createCredential);

credentialRouter.delete('/credential/:id', validateToken, deleteCredential);

export default credentialRouter;