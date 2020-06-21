import { Schema, model } from "mongoose";
import { IMember } from "../interfaces/IMember";
import * as Joi from "@hapi/joi";

export const MemberValidationSchema = Joi.object().keys({
    _id: Joi.string(),
    crewId: Joi.string().required(),
    image: Joi.string(),
    name: Joi.string().email().required(),
    userId: Joi.string().required()
});


const memberSchema = new Schema({
    crewId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

export const MemberModel = model<IMember>("Member", memberSchema);