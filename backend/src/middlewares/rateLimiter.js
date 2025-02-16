// src/middlewares/rateLimiter.js
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes window
  max: 100, // Limit each IP to 100 requests per windowMs
  message:
    'Too many requests from this IP, please try again after 60 minutes',
  headers: true,
});

export default apiLimiter;
