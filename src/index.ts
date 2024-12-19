import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import http from "http";

const app = express();

const PORT = 3000;

const server = http.createServer(app);

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
  server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
