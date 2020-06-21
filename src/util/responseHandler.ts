
import { Request, Response } from "express";
/**
 * initiate a Class
 */
class ResponseHandler {

    public res: Response;
    private successStatus: boolean;
    private status: number;
    private message: string;
    private appVersion: string;
    private result: any;
    private platformStatus: number;

    /**
     *
     * @param {*} res
     * @param {*} successStatus
     * @param {*} status
     * @param {*} message
     * @param {*} appVersion
     * @param {*} result
     * @param {*} platformStatus
     */
    public setResponse(res: Response, successStatus: boolean, status: number, message: string, appVersion: string, result: any, platformStatus = 200) {

        this.res = res;
        this.successStatus = successStatus;
        this.status = status;
        this.message = message;
        this.appVersion = appVersion;
        this.result = result;
        this.platformStatus = platformStatus;
        this.res.status(this.status).send({
            success: this.successStatus,
            code: this.status,
            message: this.message,
            appVersion: this.appVersion,
            data: (this.result === null || this.result === "null" || this.result === "") ? [] : this.result,
        });

    }
}


export default new ResponseHandler();
