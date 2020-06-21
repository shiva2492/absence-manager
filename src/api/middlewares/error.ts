

import {
    errorMessage,
    version
} from "../../config/constants";
import * as HttpStatus from "http-status";
import CustomResponse from "../../util/responseHandler";
import { Request, Response } from "express";

/**
 * HandleError class
 * contains methods related to
 * error handling
 * @class
 */
export class HandleError {
    /**
     * Catch 404 and forward to error handler
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @return {*}
     */
    public notFound(req: Request, res: Response, next: any) {
        CustomResponse.setResponse(
            res,
            false,
            HttpStatus.NOT_FOUND,
            errorMessage.NOT_FOUND,
            version.v1,
            {}
        );
    }
}
