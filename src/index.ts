import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import { connect } from "mongoose";

import Passport from "./middleware/passport";
import Router from "./router";

import { serve, setup } from "swagger-ui-express";
import { swaggerApiSpec, swaggerThemeOptions } from "./utils/swagger";
import { createBook } from "./utils/create-book";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Passport.initialize());

app.use('/api-docs/v1', serve, setup(swaggerApiSpec, swaggerThemeOptions));
app.use(Router);

(async () => {
  try {
    await connect(process.env.MONGODB_URI!)
      .then(() => console.log("MongoDB connected succesfuly!"));

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on ${process.env.PORT!} PORT`);
    });

    await createBook();
  } catch (error) {
    console.error(error);
  }
})();