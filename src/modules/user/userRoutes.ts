import express from 'express';
import * as userController from './userController';

const userRoutes = express();

userRoutes.get('/:id', userController.getUserById);

userRoutes.post('/', userController.userSignUp);

export default userRoutes;
