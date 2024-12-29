import { Router } from 'express';
import multer from 'multer';
import * as hackathonController from './hackathonController';

const hackathonRoutes = Router();
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 },
  storage: multer.memoryStorage(),
});

hackathonRoutes.get('/', hackathonController.getHackathons);

hackathonRoutes.get('/:id', hackathonController.getHackathonById);

hackathonRoutes.post(
  '/',
  upload.single('image'),
  hackathonController.createHackathon
);

export default hackathonRoutes;
