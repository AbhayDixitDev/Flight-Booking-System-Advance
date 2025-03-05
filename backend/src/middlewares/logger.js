// src/middlewares/logger.js
import winston from 'winston';
import morgan from 'morgan';

const { combine, timestamp, label, printf, colorize } = winston.format;

// Define a custom log format
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// Create a Winston logger instance
const logger = winston.createLogger({
  level: 'info', // Default logging level
  format: combine(
    label({ label: 'FlightBookingApp' }),
    timestamp(),
    colorize(),  // Adds color to console logs
    logFormat
  ),
  transports: [
    // new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: 'logs/app.log' }) // Log to a file
  ],
});

// Create an Express middleware for logging HTTP requests using Morgan
const requestLogger = morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
});

export { logger, requestLogger };
