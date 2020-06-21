import express from "express";
import { AdminController } from "../controllers/admin.controller";
import absenceValidation from "../validations/absence.validation";
import validateUser from "../validations/user.validation";

const router = express.Router();
const adminController = new AdminController();

/**
*  @swagger
*  /admin/absence/:
*  get:
*      tags:
*          - Admin
*      operationId: getAllAbsencesAdmin
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
*                          $ref: '#/components/schemas/AdminResponseArray'
*          '400':
*              description: Bad request
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/ErrorResponse'
*/
router.get("/absence/", adminController.getAllAbsencesAdmin);


/**
*  @swagger
*  /admin/absence/download-iCal:
*  get:
*      tags:
*          - Admin
*      operationId: downloadICalFileAdmin
*      summary: download the ical file
*      security:
*          - ApiKeyAuth: []
*      parameters:
*        - in: query
*          name: userId
*          schema:
*            type: string
*          description: UserId for absence
*        - in: query
*          name: startDate
*          schema:
*            type: string
*          description: start date for absence. 
*        - in: query
*          name: endDate
*          schema:
*            type: string
*          description: end date for absence. 
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
router.get("/absence/download-iCal", adminController.downloadICalFileAdmin);


/**
*  @swagger
*  /admin/users/:
*  get:
*      tags:
*          - Admin
*      operationId: listUsers
*      summary: list users
*      security:
*          - ApiKeyAuth: []
*      produces:
*          - application/json
*      responses:
*          '200':
*              description: users listing
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
router.get("/users/", adminController.listUsers);

export default router;


/**
* @swagger
* components:
*  schemas:
*      Admin:
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
*      AdminResponseObj:
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
*      AdminResponseArray:
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