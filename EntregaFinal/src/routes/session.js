import express from 'express';
import { passportCall } from '../utils/middlewares.js';
import upload from '../services/uploader.js'
import dotenv from 'dotenv';
import sessionController from '../controllers/sessionController.js';

dotenv.config();
const router = express.Router();

router.post('/register',upload.single('profilePic'),passportCall('register'),sessionController.register)

router.post('/login',passportCall('login'),sessionController.login);

router.get('/current',passportCall('jwt'),sessionController.current);

export default router;
