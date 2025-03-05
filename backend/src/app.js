// src/app.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import healthCheckRouter from './routes/healthCheck.js';

// Import additional middlewares
import { requestLogger } from './middlewares/logger.js';
import apiLimiter from './middlewares/rateLimiter.js';

const app = express();

// Get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Global Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Request Logging (using Winston and Morgan)
app.use(requestLogger);

// Rate Limiting (applied to all API endpoints)
app.use(apiLimiter);

// Health Check endpoint
app.use(healthCheckRouter);

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  // console.error('Error middleware:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.errors || [],
  });
});

export default app;
