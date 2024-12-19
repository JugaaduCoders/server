import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import http from "http";

const app = express();

const server = http.createServer(app);

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// server.listen(process.env.SERVER_PORT, () => {
//   console.log(`Server running on port ${process.env.SERVER_PORT}`);
// });
