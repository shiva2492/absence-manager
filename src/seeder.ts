'use strict';

import mongoose from "mongoose";
import path from "path";
import * as fs from 'fs';
import * as sha5 from "js-sha512";
import { UserModel } from "./api/models/user.model";
import { AbsenceModel } from "./api/models/absence.model";
import { MemberModel } from "./api/models/member.model";
import { AbsenceTypeModel } from "./api/models/absenceType.model";
import { IAbsence } from "./api/interfaces/IAbsence"
import { cat } from "shelljs";

const logger = "[seeder]";
const sha512 = sha5.sha512;
const userList = JSON.parse(fs.readFileSync(
    path.join(__dirname, "../src/userList.json"),
    "utf8"));
const memberList = JSON.parse(fs.readFileSync(
    path.join(__dirname, "../src/memberList.json"),
    "utf8"));
const absenceTypeList = JSON.parse(fs.readFileSync(
    path.join(__dirname, "../src/absenceTypeList.json"),
    "utf8"));
const absenceList = JSON.parse(fs.readFileSync(
    path.join(__dirname, "../src/absenceList.json"),
    "utf8"));

export const seed = async function () {

    const methodName = "[seed]"
    try {
        // await cleanAll();
        await seedUsers();
        await seedAbsenceTypes();
        await seedMembers();
        await seedAbsences();
    } catch (error) {
        console.log(logger, methodName, error);
    }
};

const cleanAll = async function () {

    const methodName = "[cleanAll]"
    try {
        await UserModel.remove({});
        await MemberModel.remove({});
        await AbsenceTypeModel.remove({});
        await AbsenceModel.remove({});
    } catch (error) {
        console.log(logger, methodName, error);
    }
};


const seedUsers = async function () {

    const methodName = "[seedUserList]"
    try {

        let count = await UserModel.count({});
        if (count == 0) {
            for (let user of userList) {
                user.password = sha512("1234");
                const userObj = new UserModel(user);
                await UserModel.create(userObj);
            }
            let adminUser = {
                email: "admin@email.com",
                userName: "Crewmeister",
                password: sha512("1234"),
                role: "admin"
            };
            const adminObj = new UserModel(adminUser);
            await UserModel.create(adminObj);
            console.log("Users Seeding Done");
        }
        else {
            console.log("Users already seeded");
        }

    }
    catch (error) {
        console.log(logger, methodName, error);
    }
};

const seedMembers = async function () {

    const methodName = "[seedMembers]"
    try {

        let count = await MemberModel.count({});
        if (count == 0) {
            for (let member of memberList) {
                let userId = await UserModel.findOne({ userName: member.name });
                member.userId = userId._id;
                const memberObj = new MemberModel(member);
                await MemberModel.create(memberObj);
            }
            console.log("Members Seeding Done");
        }
        else {
            console.log("Members already seeded");
        }

    }
    catch (error) {
        console.log(logger, methodName, error);
    }
};




const seedAbsenceTypes = async function () {

    const methodName = '[seedAbsenceTypes]'
    try {

        let count = await AbsenceTypeModel.count({});
        if (count == 0) {
            for (let absenceType of absenceTypeList) {
                const absenceTypeObj = new AbsenceTypeModel(absenceType);
                await AbsenceTypeModel.create(absenceTypeObj);
            }
            console.log('AbsenceTypes Seeding Done');
        }
        else {
            console.log("AbsenceTypes already seeded");
        }

    }
    catch (error) {
        console.log(logger, methodName, error);
    }
};



const seedAbsences = async function () {

    const methodName = '[seedAbsences]'
    try {
        let count = await AbsenceModel.count({});
        if (count == 0) {
            for (let absence of absenceList) {

                //check admitterId
                let admitterFound = await MemberModel.findOne({ name: absence.admitterName });

                //check absenceTypeId
                let absenceTypeFound = await AbsenceTypeModel.findOne({ name: absence.type });

                //check userId
                let userFound = await UserModel.findOne({ userName: absence.userName });

                absence.admitterId = admitterFound ? admitterFound._id : null;
                absence.absenceTypeId = absenceTypeFound._id;
                absence.userId = userFound._id;
                const absenceObj = new AbsenceModel(absence);
                await AbsenceModel.create(absenceObj);
            }
            console.log('Absences Seeding Done');
        }
        else {
            console.log("Absences already seeded");
        }

    }
    catch (error) {
        console.log(logger, methodName, error);
    }
};