import express from "express";
import { UserController } from "../controllers/user.controller";
import validateUser from "../validations/user.validation";

const router = express.Router();
const userController = new UserController();



/**
*  @swagger
*  /users/signup:
*  post:
*      tags:
*          - User
*      operationId: signup
*      summary: register a user
*      produces:
*          - application/json
*      requestBody:
*           content:
*             application/json:
*               schema:
*                    type: object
*                    properties:
*                        email:
*                           type: string
*                        password:
*                           type: string
*                        gender:
*                           type: string
*                    required:
*                       - email
*                       - password
*               examples:
*                 normal-user:
*                   value:
*                       email: "test@email.com"
*                       password: "1234"
*      responses:
*          '201':
*              description: User Created
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/UserResponseObj'
*          '400':
*              description: Bad request
*              content:
*                  application/json:
*                      schema:
*                          $ref: '#/components/schemas/ErrorResponse'
*/
router.post("/signup", validateUser, userController.signup);

/**
*  @swagger
*  /users/login:
*  post:
*      tags:
*          - User
*      operationId: login
*      summary: login a user
*      produces:
*          - application/json
*      requestBody:
*           content:
*             application/json:
*               schema:
*                    type: object
*                    properties:
*                        email:
*                           type: string
*                        password:
*                           type: string
*                    format: password
*               examples:
*                 normal-user:
*                   value:
*                       email: "max@email.com"
*                       password: "1234"
*                 admin-user:
*                   value:
*                       email: "admin@email.com"
*                       password: "1234"
*               format: password
*      responses:
*          '200':
*              description: User succesfully logged in
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
router.post("/login", validateUser, userController.login);

export default router;


/**
* @swagger
* components:
*  schemas:
*      User:
*          type: object
*          properties:
*              _id:
*                  type: string
*              userName:
*                  type: string
*              email:
*                  type: string
*              role:
*                  type: string
*                  enum: ['user','admin']
*              active:
*                  type: boolean
*              gender:
*                  type: string
*              createdAt:
*                  type: string
*              updatedAt:
*                  type: string
*      UserResponseObj:
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
*                  $ref: '#/components/schemas/User'
*      UserResponseArray:
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
*                  $ref: '#/components/schemas/User'
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