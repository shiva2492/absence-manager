import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/IUser";
import * as Joi from "@hapi/joi";

export const UserValidationSchema = Joi.object().keys({
    _id: Joi.string(),
    userName: Joi.string(),
    role:  Joi.string(),
    email:  Joi.string().email().required(),
    password:  Joi.string().required(),
    active:  Joi.string(),
    gender:  Joi.string()
});


const userSchema = new Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    gender: {
        type: String,
        enum: ["M", "F"],
    }
}, { timestamps: true });

export const UserModel = model<IUser>("User", userSchema);