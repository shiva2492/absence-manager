import {
    Request,
    Response
} from "express";
import ResponseHandler from "../../util/responseHandler";
import * as HttpStatus from "http-status";
import logger from "../../config/logger";
import {
    errorMessage,
    version
} from "../../config/constants";
import {
    AbsenceRepository
} from "../repository/absence.repository";
import {
    UserRepository
} from "../repository/user.repository";
const loggerName = "[admin.controller]";


/**
 * AdminController class
 * contains methods related to
 * Absence Management & User Listing for admin
 * @class
 */
export class AdminController {

    private _absenceRepository: AbsenceRepository;
    private _userRepository: UserRepository;

    constructor() {
        this._absenceRepository = new AbsenceRepository();
        this._userRepository = new UserRepository();
    }

    /**
     * @description method to get list of absences
     * @param {Request} req req object containing request headers
     * @param {Response} res response object
     */
    public getAllAbsencesAdmin = async (req: Request, res: Response): Promise<any> => {
        const methodName = "[getAllAbsencesAdmin]";
        try {

            const reqObj: any = req;
            const { decoded } = reqObj
            const options = {
                decoded: decoded
            }
            const absenceList = await this._absenceRepository.getAbsenceListAdmin(options);

            if (absenceList) {
                return ResponseHandler.setResponse(
                    res,
                    true,
                    HttpStatus.OK,
                    errorMessage.SUCCESS,
                    version.v1,
                    absenceList
                );
            } else {
                return ResponseHandler.setResponse(
                    res,
                    true,
                    HttpStatus.OK,
                    errorMessage.NO_RECORD_FOUND,
                    version.v1,
                    []
                );
            }
        } catch (error) {

            logger.error(`${loggerName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(
                res,
                false,
                HttpStatus.INTERNAL_SERVER_ERROR,
                `${error}`,
                version.v1,
                []
            );
        }
    }


    /**
     * @description method to download iCal file
     * @param {Request} req req object containing request headers & query params
     * @param {Response} res response object
     */
    public downloadICalFileAdmin = async (req: Request, res: Response): Promise<any> => {
        const methodName = "[downloadICalFile]";
        try {

            const reqObj: any = req;
            const { decoded } = reqObj
            const options = {
                decoded: decoded,
                params: req.query
            }
            const calendar = await this._absenceRepository.downloadIcalFileAdmin(options);

            if (calendar) {
                calendar.serve(res);
            } else {
                return ResponseHandler.setResponse(
                    res,
                    true,
                    HttpStatus.OK,
                    errorMessage.NO_RECORD_FOUND,
                    version.v1, {}
                );
            }
        } catch (error) {

            logger.error(`${loggerName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(
                res,
                false,
                HttpStatus.INTERNAL_SERVER_ERROR,
                `${error}`,
                version.v1,
                []
            );
        }
    }


    /**
     * @description method to list all users
     * @param {Request} req req object containing request headers
     */
    public listUsers = async (req: Request, res: Response): Promise<any> => {
        const methodName = "[listUsers]";
        try {

            const usersArr = await this._userRepository.getUsersListAdmin();
            if (usersArr && usersArr.count > 0) {
                return ResponseHandler.setResponse(
                    res,
                    true,
                    HttpStatus.OK,
                    errorMessage.SUCCESS,
                    version.v1,
                    usersArr
                );
            } else {
                return ResponseHandler.setResponse(
                    res,
                    true,
                    HttpStatus.OK,
                    errorMessage.NO_RECORD_FOUND,
                    version.v1, {}
                );
            }

        } catch (error) {

            logger.error(`${loggerName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(
                res,
                false,
                HttpStatus.INTERNAL_SERVER_ERROR,
                `${error}`,
                version.v1,
                []
            );
        }
    }

}