import Joi from "joi";
import {CreateCredentialData} from '../types/credentialTypes'

export const credentialSchema = Joi.object<CreateCredentialData>({
    title: Joi.string().max(50).required(),
    url: Joi.string().uri().trim().required(),
    userName: Joi.string().required(),
    password: Joi.string().required()
});