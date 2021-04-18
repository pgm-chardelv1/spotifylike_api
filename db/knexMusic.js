/**
 * Create a simple database connection with knex
 */
import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const knexMusic = knex({
    client: 'sqlite3',
    connection: {
      filename: process.env.DB_FILENAME,
      // filename: './music.sqlite3'
      // To seed songs place json and seedSongs.js into /db folder and change
      // Filename to hardcoded string to avoid unclear errors in node modules
      // Where it expects a string for the database connection
    },

  useNullAsDefault: true,
});

export default knexMusic;