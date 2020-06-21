import {
    Request,
    Response
} from "express";
import ResponseHandler from "../../util/responseHandler";
import * as HttpStatus from "http-status";
import logger from "../../config/logger";
import {
    errorMessage,
    version,
} from "../../config/constants";
import {
    AbsenceRepository
} from "../repository/absence.repository";
const loggerName = "[absence1.controller]";


/**
 * AbsenceController class
 * contains methods related to
 * Absence Management
 * @class
 */
export class AbsenceController {

    private _absenceRepository: AbsenceRepository;

    constructor() {
        this._absenceRepository = new AbsenceRepository();
    }

    /**
     * @description method to get list of absences
     * @param {Request} req req object containing absence fields
     * @param {Response} res response object
     */
    public getAllAbsences = async (req: Request, res: Response): Promise<any> => {
        const methodName = "[getAllAbsences]";
        try {

            const reqObj: any = req;
            const { decoded } = reqObj
            const options = {
                decoded: decoded
            }
            const absenceList = await this._absenceRepository.getAbsenceList(options);

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
     * @param {Request} req req object containing request headers
     * @param {Response} res response object
     */
    public downloadICalFile = async (req: Request, res: Response): Promise<any> => {
        const methodName = "[downloadICalFile]";
        try {

            const reqObj: any = req;
            const { decoded } = reqObj
            const options = {
                decoded: decoded,
                params: req.query
            }
            const calendar = await this._absenceRepository.downloadIcalFile(options);

            if (calendar) {
                res.setHeader("Content-Type", "text/calendar");
                res.status(201)
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
}