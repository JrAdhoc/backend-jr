import express from 'express';
import viewsController from '../controllers/views.js';

const router = express.Router();

router.get('/',viewsController.homeView)
router.get('/login',viewsController.loginView)



export default router;
