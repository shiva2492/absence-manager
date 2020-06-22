import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

export const specs = swaggerJSDoc({
    swaggerDefinition: {
        openapi: "3.0.3",
        info: {
            title: "Absence Manager",
            version: "1.0.0",
            description: "API Documentation for Absence Manager"
        },
        servers: [{
            url: "http://localhost:3000/api/v1",
        }],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "x-access-token"
                }
            }
        },
    },
    apis: [path.join(__dirname, "../api/routes/*.route.js")]
});