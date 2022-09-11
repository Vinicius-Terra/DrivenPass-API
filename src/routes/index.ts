import { Router } from 'express';
import cardRouter from './cardRouter';
import credentialRouter from './credentialRouter';
import noteRouter from './noteRouter';
import userRouter from './userRouter';
import wifiRouter from './wifiRouter';

const router = Router();
router.use(cardRouter);
router.use(credentialRouter);
router.use(noteRouter);
router.use(userRouter);
router.use(wifiRouter);

export default router;
