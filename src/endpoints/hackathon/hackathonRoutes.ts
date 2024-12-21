import express from "express";
import { createSuccess, defaultErrorHandler } from "../../utils/response";

const app = express();

app.get("/", (req, res) => {
  if (req.query.val == "error") {
    return defaultErrorHandler(res, "", "");
  }
  return createSuccess(res, "successfull", "", "");
});

export default app;
