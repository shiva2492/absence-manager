import { Document } from "mongoose";

export interface IMember extends Document {
    _id: string;
    crewId: string;
    image: string;
    name: string;
    userId: string;
}