import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import {
    jwtSecret
} from "../config/vars";

const loggerName = "[TokenGuard]:";

const protectedRoutes = [
    "/api/v1/absence/",
    "/api/v1/absence/download-iCal",
    "/api/v1/admin/absence/",
    "/api/v1/admin/absence/download-iCal",
    "/api/v1/admin/users/",
];


class TokenVerify {
    constructor() { }

    public urlChecker = (url: string) => {
        for (const route of protectedRoutes) {
            if (url.includes(route)) {
                return false;
            }
        }
        return true;
    }

    public verifyToken = (req: any, res: Response, next: any) => {
        const token = req.headers["x-access-token"] || req.headers.authorization;
        if (this.urlChecker(req.originalUrl)) {
            next();
        } else {
            if (token) {
                jwt.verify(token, jwtSecret, function (err: any, decoded: any) {
                    if (err) {
                        console.error(loggerName, err.name);
                        console.error(loggerName, err.message);
                        if (err instanceof jwt.TokenExpiredError) {
                            return res.send({
                                success: false,
                                code: 403,
                                message: "Session expired"
                            });
                        }
                        return res.send({
                            success: false,
                            code: 400,
                            message: "Token not valid"
                        });
                    } else {
                        req.decoded = decoded;
                        req.token = token;
                        if (req.originalUrl.indexOf("admin") >= 0 &&
                            decoded.role !== "admin") {
                            console.error(loggerName, req.originalUrl, "not an admin");
                            return res.send({
                                success: false,
                                code: 403,
                                message: "Forbidden"
                            });
                        }
                        return next();
                    }
                });
            } else {
                return res.send({
                    success: false,
                    code: 401,
                    message: "Unauthorized"
                });
            }
        }
    }
}

export default new TokenVerify();
