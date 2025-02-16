// src/routes/healthCheck.js
import { Router } from 'express';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API is working fine',
  });
});

export default router;
