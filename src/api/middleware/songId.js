import { logger } from '../../services/logger.js';
import * as songService from '../services/songService.js';

/**
 * Validate song ids
 */
export const validateSongIds = async (req, res, next) => {
  try {
    const { playlist } = req.body;
    for (let i = 0; i < playlist.songs.length; i++) {
      const checkSong = await songService.getSongById(playlist.songs[i]);
      if (checkSong && !!checkSong.message) {
        playlist.songs.splice(i, 1);
        logger.log({ level: 'error', message: `${playlist.songs[i]} is not a valid song id. Ignoring entry.`, label: 'song-val' });
      } 
    } 
    logger.log({ level: 'info', message: `Song IDs sanitized for database insertion.`, label: 'song-val'});
    next(); 
  } catch (e) {
    logger.log({ level: 'error', message: e.message, label: 'song-val' });
    next();
  }
};