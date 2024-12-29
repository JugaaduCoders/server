import { Router } from 'express';
import * as userController from './userController';

const userRoutes = Router();

userRoutes.get('/:id', userController.getUserById);

userRoutes.post('/', userController.userSignUp);

export default userRoutes;
