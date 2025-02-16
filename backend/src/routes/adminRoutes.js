// src/routes/adminRoutes.js
import express from 'express';
import { registerAirline, registerCity, registerFlight, changeAdminPassword } from '../controllers/adminController.js';
import authMiddleware from '../middlewares/auth.js'; // if needed

const router = express.Router();

router.post('/registerAirline', registerAirline);
router.post('/registerCity', registerCity);
router.post('/registerFlight', registerFlight);

// Change password endpoint for admin. You might choose to protect this with authMiddleware if desired.
router.post('/changePassword', changeAdminPassword);

export default router;
