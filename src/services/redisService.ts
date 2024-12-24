import { createClient } from 'redis';

const redisClient = createClient();
redisClient.on('error', (error) => {
  console.error('Redis error: ', error);
});

const initializeRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Connect to Redis');
  } catch (error) {
    console.error('Failed to connect to Redis: ', error);
  }
};

export const redis = { redisClient, initializeRedis };
