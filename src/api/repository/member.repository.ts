import { BaseRepository } from "./base.repository";
import { MemberModel } from "../models/member.model";
import { IUser } from "../interfaces/IUser";

export class MemberRepository extends BaseRepository<IUser> {
    constructor() {
        super(MemberModel);
    }

}