/**
 * Import packages
 */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

/**
 * Import custom packages
 */
import authenticate from './services/auth.js'
import apiRoutes from './api/routes.js';
import {
  logger
} from './services/logger.js';

// Create a new Express application
const app = express();

// Initialize dotenv
dotenv.config();
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Parse JSON
 */
app.use(bodyParser.json());

/**
 * API Routes
 */
app.use('/auth', authenticate);

app.use('/api', cors(), apiRoutes);

app.get('/', function (req, res, next) {
  res.send(`Welcome to this Spotify-like API. Go to '/auth/login' to log in and create a token for access to the API. View README.md for complete information about possible endpoints, requests and access rights.`)
  })

app.get('/api', (req, res, next) => {
  res.json({
    message: `API is up and running. View the Readme for more info about possible endpoints and requests.`,
    sampleUsers: [{
      Admins: [{
          username: 'pinkfluffyunicorns',
          password: 'dancingonrainbows'
        },
        {
          username: 'thor',
          password: 'donder&bliksem'
        },
      ],
      Members: [{
        username: 'julien',
        password: 'maria'
      },
      {
        username: 'Charlie Sheen',
        password: 'biwinning'
      }
    ]
    }]
  });
  next();
})

app.get('*', (req, res, next) => {
  const err = new Error(
    `Failed. This endpoint is not implemented.`,
  );
  res.status(501).send(err.message);
  next(err);
});

/**
 * Start the server and listen to incoming requests
 */
let server;
if (NODE_ENV !== 'test') {
  server = app.listen(process.env.PORT, (err) => {
    if (err) throw err;
    if (NODE_ENV === 'development') {
      console.info(`Server is listening at http://localhost:${process.env.PORT}!`);
    }
  });
}

/**
 * Handle shutdown gracefully
 */
const handleGracefully = async () => {
  try {
    await server.close(async (e) => {
      if (e) throw e;
      if (NODE_ENV === 'development') {
        logger.log({ level: 'info', message: `Server shutdown initialized.`, label: 'shutdown' })
      }
      process.exit(0);
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * Handle close
 */
const handleClose = async () => {
  await server.close();
};

/**
 * Shutdown the application
 */
process.on('SIGINT', () => {
  handleGracefully();
});

/**
 * Export app for testing
 */
export {
  app,
  handleClose,
  handleGracefully,
};
