import { Document } from "mongoose";

export interface IAbsenceType extends Document {
    _id: string;
    name: string;
    descriptionTemplate: string;
}