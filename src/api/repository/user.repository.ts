import { BaseRepository } from "./base.repository";
import { UserModel } from "../models/user.model";
import { IUser } from "../interfaces/IUser";

export class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(UserModel);
    }

    async findUserByEmail(email: string): Promise<any> {
        return await UserModel.findOne({ email: email }).lean();
    }

    async getUsersListAdmin(): Promise<any> {
        let usersList: any, count: any;
        usersList = await UserModel.find()
            .sort('startDate')
            .lean();
        count = usersList.length;
        return { count: count, usersList };
    }

}