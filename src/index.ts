import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import readline from 'readline';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import { redis } from './services/redisService';
import swaggerSpec from './swagger';

const app = express();
dotenv.config();

/**
 * Function to find an available port starting from the default.
 */
async function findAvailablePort(startPort: number): Promise<number> {
  return new Promise((resolve) => {
    const server = http.createServer();
    server.listen(startPort, () => {
      server.close(() => resolve(startPort));
    });
    server.on('error', async () => {
      const userResponse = await askUserQuestion(
        `Port ${startPort} is in use. Should we find another port? (y/n): `
      );
      if (userResponse.trim() === '' || userResponse === 'y')
        resolve(findAvailablePort(startPort + 1));
    });
  });
}

/**
 * Function to prompt the user for input.
 */
function askUserQuestion(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

/**
 * Main function to initialize the server with interactive port checking.
 */
async function startServer() {
  const initialPort = process.env.SERVER_PORT;
  let port = initialPort;

  port = await findAvailablePort(Number(initialPort));

  const server = http.createServer(app);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use(cors({ credentials: true }));
  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use(routes);

  server.listen(port, () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Server running on port ${port}`);
      console.log(
        `Swagger Docs available at http://localhost:${port}/api-docs`
      );
    }
  });

  try {
    await redis.initializeRedis();
  } catch (e: Error | unknown) {
    console.log('Redis is not running', e);
  }
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});
