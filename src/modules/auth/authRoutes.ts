import express from 'express';
import * as authController from './authController';

const authRoutes = express();

authRoutes.post('/login', authController.userLogin);

authRoutes.post('/signup', authController.userSignup);

export default authRoutes;
