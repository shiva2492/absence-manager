import express from "express";
import { AbsenceController } from "../controllers/absence.controller";
import absenceValidation from "../validations/absence.validation";

const router = express.Router();
const absenceController = new AbsenceController();



/**
*  @swagger
*  /absence/:
*  get:
*      tags:
*          - Absence
*      operationId: getAllAbsences
*      summary: get list of absences
*      security:
*          - ApiKeyAuth: []
*      produces:
*          - application/json
*      responses:
*          '201':
*              description: Absences List
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/AbsenceResponseArray'
*          '400':
*              description: Bad request
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/ErrorResponse'
*/
router.get("/", absenceController.getAllAbsences);


/**
*  @swagger
*  /absence/download-iCal/:
*  get:
*      tags:
*          - Absence
*      operationId: downloadICalFile
*      summary: download the ical file
*      security:
*          - ApiKeyAuth: []
*      produces:
*          - application/json
*      responses:
*          '200':
*              description: iCal File Generated
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/SuccessResponseObj'
*          '400':
*              description: Bad request
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/ErrorResponse'
*/
router.get("/download-iCal", absenceController.downloadICalFile);


export default router;


/**
* @swagger
* components:
*  schemas:
*      Absence:
*          type: object
*          properties:
*              _id:
*                  type: string
*              confirmedAt:
*                  type: string
*              rejectedAt:
*                  type: string
*              startDate:
*                  type: string
*              endDate:
*                  type: string
*              memberNote:
*                  type: string
*              admitterId:
*                  type: string
*              absenceTypeId:
*                  type: object
*              userId:
*                  type: object
*              createdAt:
*                  type: string
*              updatedAt:
*                  type: string
*      AbsenceResponseObj:
*          type: object
*          properties:
*              success:
*                  type: boolean
*              code:
*                  type: number
*                  example: 201
*              message:
*                  type: string
*              appVersion:
*                  type: string
*              data:
*                  type: object
*                  $ref: '#/components/schemas/Absence'
*      AbsenceResponseArray:
*          type: object
*          properties:
*              success:
*                  type: boolean
*              code:
*                  type: number
*                  example: 201
*              message:
*                  type: string
*              appVersion:
*                  type: string
*              data:
*                  type: array
*                  $ref: '#/components/schemas/Absence'
*      SuccessResponseObj:
*          type: object
*          properties:
*              success:
*                  type: boolean
*              code:
*                  type: number
*                  example: 201
*              message:
*                  type: string
*              appVersion:
*                  type: string
*              data:
*                  type: array | object
*      ErrorResponse:
*          type: object
*          properties:
*              success:
*                  type: boolean
*              code:
*                  type: number
*                  example: 404
*              message:
*                  type: string
*              appVersion:
*                  type: string
*              data:
*                  type: array |object
*/