/**
 * Import packages
 */
import winston from 'winston';
import dotenv from 'dotenv';
const { combine, colorize, timestamp, printf } = winston.format;

// Configure dotenv
dotenv.config();

/**
 * Define custom format
 */
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
})

/**
 * Create loggers to export
 */
export const logger = winston.createLogger({
  format: combine(
    timestamp(),
    myFormat,
  ),
  transports: [
    new winston.transports.File({ filename: `combined.log` }),
    new winston.transports.File({ filename: `error.log`, level: 'error'}),
    new winston.transports.Console({ 
      format: combine(
        colorize(),
        timestamp(),
        myFormat,
      )
    }),
  ],
});

