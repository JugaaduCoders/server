import express from 'express';
import authRoutes from './modules/auth/authRoutes';
import hackathonRoutes from './modules/hackathon/hackathonRoutes';
import userRoutes from './modules/user/userRoutes';

import { authMiddleware } from './utils/middleware';

const app = express();

app.use('/api/user', authMiddleware, userRoutes);
app.use('/api/hackathon', hackathonRoutes);
app.use('/api/auth', authRoutes);

export default app;
