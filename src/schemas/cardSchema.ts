import Joi from "joi";
import {CreateCardData} from '../types/cardTypes'

export const cardSchema = Joi.object<CreateCardData>({
    title: Joi.string().max(50).required(),
    cardNumber: Joi.string().required(),
    cardName: Joi.string().required(),
    securityCode: Joi.number().min(100).required(),
    password: Joi.string().min(4).max(6).required(),
    expirationDate: Joi.string().min(4).max(7).required(),
    type: Joi.string().valid('credit', 'debit', 'both').required(),
    isVirtual: Joi.boolean().required()
});