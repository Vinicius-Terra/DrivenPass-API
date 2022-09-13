import Joi from "joi";
import {SignupUserData, LoginUserData} from "../types/userTypes"

export const signUpSchema = Joi.object<SignupUserData>({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(10).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
})

export const loginSchema = Joi.object<LoginUserData>({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(10).required()
});