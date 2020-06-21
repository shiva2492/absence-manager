import { Schema, model } from "mongoose";
import { IAbsenceType } from "../interfaces/IAbsenceType";
import * as Joi from "@hapi/joi";

export const AbsenceTypeValidationSchema = Joi.object().keys({
    _id: Joi.string(),
    name: Joi.string().required(),
    descriptionTemplate: Joi.string().required()
});

const absenceTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    descriptionTemplate: {
        type: String,
        required: true
    },

}, { timestamps: true });

export const AbsenceTypeModel = model<IAbsenceType>("AbsenceType", absenceTypeSchema);