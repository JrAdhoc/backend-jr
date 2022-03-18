import express from 'express';
import sessionController from '../controllers/sessions.js';

const router = express.Router();

router.post('/register',sessionController.register);

export default router;