
import { Request, Response, NextFunction } from "express";
import logger from "../../config/logger";
import ResponseHandler from "../../util/responseHandler";
import * as HttpStatus from "http-status";
import {
    errorMessage,
    version
} from "../../config/constants";
import { UserValidationSchema } from "../../api/models/user.model";

const fileName = "[user.validation.js]";

const validateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const methodName = "[validateUser]";
    const { error } = UserValidationSchema.validate(req.body);

    if (!error) return next();

    logger.error(`${fileName} ${methodName} Validation Error ${error}`);

    return ResponseHandler.setResponse(
        res,
        false,
        HttpStatus.BAD_REQUEST,
        errorMessage.FAILED,
        version.v1,
        {
            error: "Bad Request"
        }
    );
};


export default validateUser;