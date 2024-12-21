import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { serverLog } from '../utils/logs';
import { hackathon } from './schema/hackathon';
import { hackathonParticipant } from './schema/hackathonParticipant';
import { team } from './schema/team';
import { teamMember } from './schema/teamMember';
import { user } from './schema/user';

dotenv.config();

if (
  !process.env.DB_HOST ||
  !process.env.DB_PORT ||
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_NAME
) {
  throw new Error('Missing required environment variables');
}

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: false,
});
export const db = drizzle({
  client: pool,
  schema: { user, hackathon, team, teamMember, hackathonParticipant },
  logger: {
    logQuery: (query: string) => {
      serverLog(`[Drizzle Query]: ${query}`, drizzle.name);
    },
  },
});
