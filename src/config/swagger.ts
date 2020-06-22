import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import {
    httpScheme,
    domain,
    port,
    basePath,
    apiVersion
} from "./vars";

export const specs = swaggerJSDoc({
    swaggerDefinition: {
        openapi: "3.0.3",
        info: {
            title: "Absence Manager",
            version: `${apiVersion}`,
            description: "API Documentation for Absence Manager"
        },
        servers: [{
            url: `${httpScheme}://${domain}:${port}${basePath}`,
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