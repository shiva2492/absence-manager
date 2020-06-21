import { Document } from "mongoose";

export interface IUser extends Document {
    _id: string;
    userName: string;
    role: string;
    email: string;
    password: string;
    active: boolean;
    gender: string;
}