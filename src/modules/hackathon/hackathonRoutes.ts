import express from 'express';
import * as hackathonController from './hackathonController';

const hackathonRoutes = express();

hackathonRoutes.get('/', hackathonController.getHackathons);

hackathonRoutes.get('/:id', hackathonController.getHackathonById);

export default hackathonRoutes;
