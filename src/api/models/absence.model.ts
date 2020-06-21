import { Schema, model } from "mongoose";
import { IAbsence } from "../interfaces/IAbsence";
import * as Joi from "@hapi/joi";

export const AbsenceValidationSchema = Joi.object().keys({
    _id: Joi.string(),
    confirmedAt: Joi.string().required(),
    rejectedAt: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    admitterId: Joi.string().required(),
    admitterNote: Joi.string(),
    memberNote: Joi.string(),
    absenceTypeId: Joi.string().required(),
    userId: Joi.string().required()
});


const absenceSchema = new Schema({
    confirmedAt: {
        type: Date
    },
    rejectedAt: {
        type: Date
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    memberNote: {
        type: String
    },
    admitterId: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    },
    absenceTypeId: {
        type: Schema.Types.ObjectId,
        ref: 'AbsenceType',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

export const AbsenceModel = model<IAbsence>("Absence", absenceSchema);