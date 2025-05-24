import swaggerJsDoc from "swagger-jsdoc";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";

const swaggerApiOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API Documentation for Task-Managenent project",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./src/routers/*.ts"]
};

const theme = new SwaggerTheme();

export const swaggerThemeOptions = {
  explorer: true,
  customCss: theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK),
  swaggerOptions: {
    persistAuthorization: true,
  },
};

export const swaggerApiSpec = swaggerJsDoc(swaggerApiOptions);