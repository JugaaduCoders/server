import express from "express";
import * as userController from "./userController";

const app = express();

app.get("/:id", userController.getUser);

app.post("/", userController.createUsers);

export default app;
