import { Document } from "mongoose";
import { IUser } from "./IUser";
import { IMember } from "./IMember";
import { IAbsenceType } from "./IAbsenceType";


export interface IAbsence extends Document {
    _id: string;
    confirmedAt: string;
    rejectedAt: string;
    startDate: string;
    endDate: number
    memberNote: string;
    admitterId: IMember;
    absenceTypeId: IAbsenceType;
    userId: IUser;
}