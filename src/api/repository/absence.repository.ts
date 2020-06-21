import { BaseRepository } from "./base.repository";
import { AbsenceModel } from "../models/absence.model";
import { IAbsence } from "../interfaces/IAbsence";
import ical from "ical-generator";
import moment from "moment";
import { ObjectId } from "bson";
import { Types } from "mongoose";
import { MemberModel } from "../models/member.model";
import { UserModel } from "../models/user.model";

export class AbsenceRepository extends BaseRepository<IAbsence> {
    constructor() {
        super(AbsenceModel);
    }

    async getAbsenceList(options: any): Promise<any> {
        const role: string = options.decoded.role;
        const decodedUserId: any = Types.ObjectId(options.decoded._id);
        let absencesList: any, count: any;
        absencesList = await AbsenceModel.find({ userId: decodedUserId })
            .sort('startDate')
            .populate('admitterId', 'name')
            .populate('absenceTypeId', 'name')
            .populate('userId', 'userName email')
            .lean();
        count = absencesList.length;
        return { count: count, absencesList };
    }


    async getAbsenceListAdmin(options: any): Promise<any> {
        const role: string = options.decoded.role;
        const decodedUserId: any = Types.ObjectId(options.decoded._id);
        let absencesList: any, count: any;
        absencesList = await AbsenceModel.find()
            .sort('createdAt')
            .populate('userId', 'name email')
            .lean();
        count = absencesList.length;
        return { count: count, absencesList };
    }

    async downloadIcalFile(options: any): Promise<any> {
        const role: string = options.decoded.role;
        const decodedUserId: any = Types.ObjectId(options.decoded._id);
        const params: any = options.params;
        let absenceList: any, query: any = {};
        const cal = ical({
            domain: 'crewmeister.com/',
            prodId: { company: 'Crewmeister', product: 'absence manager' },
            name: 'Crewmeister Absence Manager',
            timezone: 'Europe/Berlin'
        });

        absenceList = await AbsenceModel.find({ userId: decodedUserId })
            .sort('startDate')
            .populate('admitterId', '_id name')
            .populate('absenceTypeId', '_id name descriptionTemplate')
            .populate('userId', '_id userName email')
            .lean();

        for (let absence of absenceList) {
            let description = absence.memberNote;
            let summary = absence.absenceTypeId.descriptionTemplate;
            summary = summary.replace("$member_name", absence.userId.userName);
            cal.createEvent({
                start: moment(absence.startDate),
                end: moment(absence.endDate),
                summary: summary,
                description: description
            });
        }
        return cal;
    }

    async downloadIcalFileAdmin(options: any): Promise<any> {
        const role: string = options.decoded.role;
        const decodedUserId: any = Types.ObjectId(options.decoded._id);
        const params: any = options.params;
        let absenceList: any, query: any = {};
        const cal = ical({
            domain: 'crewmeister.com/',
            prodId: { company: 'Crewmeister', product: 'absence manager' },
            name: 'Crewmeister Absence Manager',
            timezone: 'Europe/Berlin'
        });

        if (params.userId) {
            query.userId = params.userId;
        }
        if (params.startDate && params.endDate) {
            query.$and = [{ "startDate": { "$lte": new Date(params.endDate) } }, { "endDate": { "$gte": new Date(params.startDate) } }];
        }
        absenceList = await AbsenceModel.find(query)
            .sort('startDate')
            .populate('admitterId', '_id name')
            .populate('absenceTypeId', '_id name descriptionTemplate')
            .populate('userId', '_id userName email')
            .lean();
        if (absenceList.length == 0) return;

        for (let absence of absenceList) {
            let description = absence.memberNote;
            let summary = absence.absenceTypeId.descriptionTemplate;
            summary = summary.replace("$member_name", absence.userId.userName);
            cal.createEvent({
                start: moment(absence.startDate),
                end: moment(absence.endDate),
                summary: summary,
                description: description
            });
        }
        return cal;
    }

}