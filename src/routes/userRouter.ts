import { Router } from 'express';
import {
    createUser,
    login
} from '../controllers/userController';
import { validateSchemaMiddleware } from './../middlewares/validateSchema';

const userRouter = Router();

userRouter.post('/sigin', createUser);

userRouter.post('/login', login);


export default userRouter;