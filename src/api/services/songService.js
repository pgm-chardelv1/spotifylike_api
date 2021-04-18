/**
 * Service for connection between songs table / controller
 */

import knexMusic from '../../../db/knexMusic.js';
import { logger } from '../../services/logger.js';

/**
 * Add a song to the database
 * @param {object} song 
 */
const createSong = async (song) => {
  try {
    const createdSong = await knexMusic('songs')
      .insert({
        id: song.id,
        title: song.title,
        artist: song.artist,
        uri: song.uri,
        date_created: song.dateCreated,
      });
      if (createdSong === undefined) throw new Error('Could not create song.');
      logger.log({level: 'info', message: `Created song with title: ${song.title}.`, label: 'song'});
      return createdSong;
  } catch (e) {
    logger.log({level: 'error', message: e.message, label: 'song'});
    return e;
  }
}

/**
 * Updates an existing song in the database
 * @param {string} id 
 * @param {object} song 
 */
const updateSong = async (id, song) => {
  try {
    const updatedSong = await knexMusic('songs')
      .where('id', id)
      .update({
        title: song.title,
        artist: song.artist,
        uri: song.uri
      });
      if (!(!!updatedSong)) throw new Error(`Could not update song with id: ${id}.`);
      logger.log({level: 'info', message: `Updated song with info: ${song}.`, label: 'song'});
      return updatedSong;
  } catch (e) {
    logger.log({level: 'error', message: e.message, label: 'song'});
    return e;
  }
}

/**
 * Deletes a specific song
 * @param {string} id 
 */
const deleteSong = async (id) => {
  try {
    const deletedSong = await knexMusic('songs')
      .where('id', id)
      .del();
    if (!(!!deletedSong)) throw new Error(`Could not delete song with id: ${id}.`);
    logger.log({level: 'info', message: `Deleted song with id: ${id}.`, label: 'song'});
    return deletedSong;
  } catch (e) {
    logger.log({level: 'error', message: e.message, label: 'song'});
    return e;
  }
}

/**
 * Get all the songs
 * @returns All songs
 */
const getSongs = async () => {
  try {
    const songs = await knexMusic('songs')
      .select('*');
    if (songs.length === 0) throw new Error('Could not fetch songs.');
    logger.log({level: 'info', message: `Fetched all songs`, label: 'song'});
    return songs;
  } catch (e) {
    logger.log({level: 'error', message: e.message, label: 'song'});
    return e;
  }
}

/**
 *  Get song by id
 * @param {string} id
 */
const getSongById = async (id) => {
  try {
    const foundSong = await knexMusic('songs')
      .where('id', id)
      .first()
    if (!(!!foundSong.id)) throw new Error(`Could not fetch song with id: ${id}.`);
    logger.log({level: 'info', message: `Fetched song with id: ${id}.`, label: 'song'});
    return foundSong;
  } catch (e) {
    logger.log({level: 'error', message: e.message, label: 'song'});
    return e;
  }
}

/**
 * Exports
 */
export {
  createSong,
  deleteSong,
  getSongById,
  getSongs,
  updateSong,
}
