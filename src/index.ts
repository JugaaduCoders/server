import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import routes from './routes';

const app = express();

dotenv.config();

const server = http.createServer(app);
app.use(cors({ credentials: true }));

app.use(cookieParser());
app.use(bodyParser.json());

/* routes */
app.use(routes);

server.listen(process.env.SERVER_PORT, () => {
  if (process.env.NODE_ENV === 'development')
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
