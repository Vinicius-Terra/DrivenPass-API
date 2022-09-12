import { Router } from 'express';
import {
    createUser,
    login
} from '../controllers/userController';
import { validateSchemaMiddleware } from './../middlewares/validateSchema';
import {signUpSchema, loginSchema} from '../schemas/userSchema'

const userRouter = Router();

userRouter.post('/sigin', validateSchemaMiddleware(signUpSchema), createUser);

userRouter.post('/login', validateSchemaMiddleware(loginSchema), login);


export default userRouter;