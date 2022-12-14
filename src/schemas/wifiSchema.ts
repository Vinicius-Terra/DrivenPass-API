import Joi from "joi";
import {CreateWifiData} from '../types/wifiTypes'

export const wifiSchema = Joi.object<CreateWifiData>({
    title: Joi.string().max(50).required(),
    name: Joi.string().required(),
    password: Joi.string().required()
});
