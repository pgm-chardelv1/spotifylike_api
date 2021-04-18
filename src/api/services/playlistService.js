/**
 * Service for connection between playlists table / controller
 */

import knexMusic from '../../../db/knexMusic.js';
import {
  logger
} from '../../services/logger.js';

/**
 * Create a playlist
 * @param {object} playlist 
 */
const createPlaylist = async (playlist) => {
  try {
    await knexMusic('users')
      .where('username', playlist.owner)
      .then(async usersList => {
        if (usersList.length === 1) {
          const createdPlaylist = await knexMusic('playlists')
            .insert({
              id: playlist.id,
              title: playlist.title,
              description: playlist.description,
              owner: playlist.owner,
              date_created: playlist.dateCreated,
              date_modified: playlist.dateModified,
              songs_list: JSON.stringify(playlist.songs),
            });
          logger.log({
            level: 'info',
            message: `Created playlist with title: ${playlist.title}.`,
            label: 'playlist'
          });
          return createdPlaylist;
        } else {
          throw new Error('Not inserting playlist because owner is not a known user.')
        }
      })   
  } catch (e) {
    logger.log({
      level: 'error',
      message: e.message,
      label: 'playlist'
    });
    return e;
  }
};

/**
 * Update songs in current playlist
 * @param {string} id 
 * @param {object} playlist
 */
const updatePlaylist = async (id, playlist) => {
  try {
    const updatedPlaylist = await knexMusic('playlists')
      .where('id', id)
      .update({
        title: playlist.title,
        description: playlist.description,
        date_modified: playlist.dateModified,
        songs_list: JSON.stringify(playlist.songs),
      })
    console.log(updatedPlaylist);  
    if (!(!!updatedPlaylist)) throw new Error(`Could not update playlist with id: ${id}.`);
    logger.log({
      level: 'info',
      message: `Updated playlist with id: ${id}.`,
      label: 'playlist'
    });
    return updatedPlaylist;
  } catch (e) {
    logger.log({
      level: 'error',
      message: e.message,
      label: 'playlist'
    });
    return e;
  }
};

/**
 * Deletes a specific song
 * @param {string} id 
 */
const deletePlaylist = async (id) => {
  try {
    const playlist = await knexMusic('playlists')
      .where('id', id)
      .del();
    if (playlist !== 1) throw new Error(`Could not delete playlist with id: ${id}.`);
    logger.log({
      level: 'info',
      message: `Deleted playlist with id: ${id}.`,
      label: 'playlist'
    });
    return playlist;
  } catch (e) {
    logger.log({
      level: 'error',
      message: e.message,
      label: 'playlist'
    });
    return e;
  }
};

/**
 * Get all the songs
 * @returns All songs
 */
const getPlaylistById = async (id) => {
  try {
    const playlist = await knexMusic('playlists')
      .where('id', id)
      .first();
    if (!(!!playlist)) {
      throw new Error(`Playlist with id ${id} not found.`)
    }
    logger.log({
      level: 'info',
      message: `Fetched playlist with id: ${id}.`,
      label: 'playlist'
    });
    return playlist;
  } catch (e) {
    logger.log({
      level: 'error',
      message: e.message,
      label: 'playlist'
    });
    return e;
  }
};

/**
 * Get playlists by owner id
 * @param {string} owner
 */
const getPlaylistsByOwner = async (owner) => {
  try {
    const playlists = await knexMusic('playlists')
      .where('owner', owner)
      .select('*')
    if (!(!!playlists) || playlists.length === 0) throw new Error(`Could not get playlists from owner with username ${owner}`);
    logger.log({
      level: 'info',
      message: `Fetched playlist(s) from owner with username ${owner}.`,
      label: 'playlist'
    });
    return playlists;
  } catch (e) {
    logger.log({
      level: 'error',
      message: e.message,
      label: 'playlist'
    });
    return e;
  }
};

/**
 * Get all playlists
 */
const getPlaylists = async () => {
  try {
    const playlists = await knexMusic('playlists')
      .select('*')
    if (!(!!playlists)) throw new Error('Could not get playlists.')
    logger.log({
      level: 'info',
      message: `Fetched all playlists.`,
      label: 'playlist'
    });
    return playlists;
  } catch (e) {
    logger.log({
      level: 'error',
      message: e.message,
      label: 'playlist'
    });
    return e;
  }
}

/**
 * Exports
 */
export {
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  getPlaylistById,
  getPlaylistsByOwner,
  getPlaylists,
}