import mongoose from "mongoose";
// import all interfaces
import { IWrite } from "../interfaces/IWrite";
import { IRead } from "../interfaces/IRead";


// this class only can be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {

    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    async create(item: T): Promise<any> {
        return await this._model.create(item);
    }

    async update(id: string, item: T): Promise<any> {
        return await this._model.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: item
            },
            {
                new: true
            });
    }

    async delete(id: string): Promise<any> {
        return await this._model.findOneAndDelete(
            {
                _id: id
            }
        );
    }

    async find(item?: T): Promise<any[]> {
        return await this._model.find({}).lean();
    }

    async findOne(id: string): Promise<any> {
        return await this._model.findOne({ _id: id }).lean();

    }
}