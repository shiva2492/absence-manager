
import { Request, Response } from "express";
import ResponseHandler from "../../util/responseHandler";
import * as HttpStatus from "http-status";
import * as sha5 from "js-sha512";
import * as jwt from "jsonwebtoken";
import logger from "../../config/logger";
import {
    errorMessage,
    version
} from "../../config/constants";
import {
    jwtSecret,
    jwtExpireTime

} from "../../config/vars";
import { UserRepository } from "../repository/user.repository";

const sha512 = sha5.sha512;
const fileName = "[user.controller.js]";


/**
 * UserController class
 * contains methods related to
 * User
 * @class
 */
export class UserController {

    private _userRepository: UserRepository;

    constructor() {
        this._userRepository = new UserRepository();
    }


    /**
    * @description method to register user into database
    * @param {Request} req req object containing user fields
    * @param {Response} res response object
    */
    public signup = async (req: Request, res: Response): Promise<any> => {
        const methodName = "[signup]";
        try {

            // find if user exists
            const existingUser = await this._userRepository.findUserByEmail(req.body.email);

            if (existingUser) {
                existingUser.password = undefined;
                return ResponseHandler.setResponse(
                    res,
                    true,
                    HttpStatus.OK,
                    `User ${errorMessage.ALREADY_EXISTS}`,
                    version.v1,
                    existingUser
                );
            }
            // hash the password
            req.body.password = sha512(req.body.password);

            const createdUser = await this._userRepository.create(req.body);

            createdUser.password = undefined;

            return ResponseHandler.setResponse(
                res,
                true,
                HttpStatus.CREATED,
                errorMessage.SUCCESS,
                version.v1,
                createdUser
            );
        }
        catch (error) {

            logger.error(`${fileName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(
                res,
                false,
                HttpStatus.INTERNAL_SERVER_ERROR,
                `${error}`,
                version.v1,
                {}
            );
        }
    }


    /**
    * @description method to authenticate user
    * @param {Request} req req object
    * @param {Response} res response object
    */
    public login = async (req: Request, res: Response): Promise<any> => {

        const methodName = "[login]";
        try {
            const data = req.body;

            const existingUser = await this._userRepository.findUserByEmail(data.email);

            if (existingUser) {

                // check if password is match
                if (existingUser.password === sha512(data.password)) {
                    // check if user is active
                    if (existingUser.active) {

                        const token = jwt.sign({
                            _id: existingUser._id,
                            email: existingUser.email,
                            role: existingUser.role,
                        }, jwtSecret, {
                                expiresIn: jwtExpireTime,
                            });

                        return ResponseHandler.setResponse(
                            res,
                            true,
                            HttpStatus.OK,
                            errorMessage.SUCCESS,
                            version.v1,
                            [{ token, email: existingUser.email }]
                        );

                    }
                    else { // user is not active
                        return ResponseHandler.setResponse(
                            res,
                            true,
                            HttpStatus.UNAUTHORIZED,
                            errorMessage.USER_NOT_ACTIVE,
                            version.v1,
                            {}
                        );

                    }
                }
                else {
                    // password incorrect
                    return ResponseHandler.setResponse(
                        res,
                        true,
                        HttpStatus.UNAUTHORIZED,
                        errorMessage.PASSWORD_INCORRECT,
                        version.v1,
                        {}
                    );

                }
            }
            else {// user does not exists
                return ResponseHandler.setResponse(
                    res,
                    true,
                    HttpStatus.UNAUTHORIZED,
                    errorMessage.USER_NOT_EXISTS,
                    version.v1,
                    {}
                );
            }
        }
        catch (error) {
            logger.error(`${fileName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(
                res,
                false,
                HttpStatus.INTERNAL_SERVER_ERROR,
                `${error}`,
                version.v1,
                {}
            );
        }
    }

}
