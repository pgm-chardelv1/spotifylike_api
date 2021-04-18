import {
  v4 as uuidv4
} from 'uuid';
import {
  handleHTTPError
} from '../../utils/index.js';
import * as playlistService from '../services/playlistService.js';
import * as userService from '../services/userService.js';
import * as songService from '../services/songService.js';
import Playlist from '../models/Playlist.js';

/**
 * Get all playlists to display
 * Get owner for playlists to display in playlist
 * Get songs to display in playlists
 */
const getPlaylists = async (req, res, next) => {
  try {
    const playlists = await playlistService.getPlaylists();
    if (playlists.message) {
      res.status(404).send(`Failed. ${playlists.message}`);
    } else {
      let parsedPlaylists = [];
      for (let playlist of playlists) {
        const owner = await userService.getUserByUsername(playlist.owner);
        const songIds = JSON.parse(playlist.songs_list);
        let songs = [];
        for (let i = 0; i < songIds.length; i++) {
          const song = await songService.getSongById(songIds[i]);
          songs.push(song);
        }
        const playlistObj = new Playlist(playlist.id, playlist.title, playlist.description, owner, playlist.date_created, playlist.date_modified, songs);
        parsedPlaylists.push(playlistObj);
      }
      res.status(200).json(parsedPlaylists);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
};

/**
 * Get one playlist
 * Get owner for playlist to display in playlist
 * Get songs to display in playlist
 */
const getPlaylistById = async (req, res, next) => {
  try {
    const {
      playlistId
    } = req.params;
    const playlist = await playlistService.getPlaylistById(playlistId);
    if (playlist.message) {
      res.status(400).send(`Failed. ${playlist.message}`);
    } else {
      const owner = await userService.getUserByUsername(playlist.owner);
      const songIds = JSON.parse(playlist.songs_list);
      let songs = [];
      for (let i = 0; i < songIds.length; i++) {
        const song = await songService.getSongById(songIds[i]);
        songs.push(song);
      }
      const playlistObj = new Playlist(playlist.id, playlist.title, playlist.description, owner, playlist.date_created, playlist.date_modified, songs);
      res.status(200).json(playlistObj);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
};

/**
 * Get all playlists from user with username
 * Get owner for playlists to display in playlist
 * Get songs to display in playlists
 */
const getPlaylistsByUsername = async (req, res, next) => {
  try {
    const {
      username
    } = req.params;
    const playlists = await playlistService.getPlaylistsByOwner(username);
    if (playlists.message) {
      res.status(400).send(`Failed. ${playlists.message}`);
    } else {
      let parsedPlaylists = [];
      for (let playlist of playlists) {
        const owner = await userService.getUserByUsername(playlist.owner);
        const songIds = JSON.parse(playlist.songs_list);
        let songs = [];
        for (let i = 0; i < songIds.length; i++) {
          const song = await songService.getSongById(songIds[i]);
          songs.push(song);
        }
        const playlistObj = new Playlist(playlist.id, playlist.title, playlist.description, owner, playlist.date_created, playlist.date_modified, songs);
        parsedPlaylists.push(playlistObj);
      }
      res.status(200).json(parsedPlaylists);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
}

/**
 * Create one playlist
 */
const createPlaylist = async (req, res, next) => {
  try {
    const {
      playlist
    } = req.body;
    const now = Date.now();
    const playlistToCreate = new Playlist(
      uuidv4(),
      playlist.title,
      playlist.description,
      playlist.owner,
      now,
      now,
      playlist.songs
    );
    const response = await playlistService.createPlaylist(playlistToCreate);
    if (response && response.message) {
      res.status(400).send(`Failed. ${response.message} Owner has to be a valid user id.`)
    } else {
      res.status(201).send(`Created the playlist with title ${playlistToCreate.title}!`);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
};

/**
 * Create one playlist for user with username
 */
const createPlaylistByUsername = async (req, res, next) => {
  try {
    const {
      playlist
    } = req.body;
    const now = Date.now();
    const {
      username
    } = req.params;
    const playlistToCreate = new Playlist(
      uuidv4(),
      playlist.title,
      playlist.description,
      username,
      now,
      now,
      playlist.songs
    );
    const response = await playlistService.createPlaylist(playlistToCreate);
    if (response && response.message) {
      res.status(400).send(`Failed. ${response.message} Owner has to be a valid user id.`)
    } else {
      res.status(201).send(`Created the playlist with title ${playlistToCreate.title}!`);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
};

/**
 * Update one playlist by playlistId
 */
const updatePlaylist = async (req, res, next) => {
  try {
    const {
      playlistId
    } = req.params;
    const {
      playlist
    } = req.body;
    playlist.dateModified = Date.now();
    const response = await playlistService.updatePlaylist(playlistId, playlist);
    if (response && response.message) {
      res.status(400).send(`Failed. ${response.message}`)
    } else {
      res.status(200).send(`Updated the playlist with id ${playlistId}!`);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
};

/**
 * Update one playlist from user with username with playlistId
 */
const updatePlaylistByUsername = async (req, res, next) => {
  try {
    const {
      playlistId
    } = req.params;
    const {
      playlist
    } = req.body;
    playlist.dateModified = Date.now();
    const response = await playlistService.updatePlaylist(playlistId, playlist);
    if (response && response.message) {
      res.status(400).send(`Failed. ${response.message}`)
    } else {
      res.status(200).send(`Updated the playlist with id ${playlistId}!`);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
}

/**
 * Delete one playlist with playlistId
 */
const deletePlaylist = async (req, res, next) => {
  try {
    const {
      playlistId
    } = req.params;
    const response = await playlistService.deletePlaylist(playlistId);
    if (response && response.message) {
      res.status(500).send(`Failed. ${response.message}`);
    } else {
      res.status(200).send(`Deleted the playlist with id ${playlistId}!`);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
};

/**
 * Delete one playlist from user with username with playlistId
 */
const deletePlaylistByUsername = async (req, res, next) => {
  try {
    const {
      playlistId
    } = req.params;
    const response = await playlistService.deletePlaylist(playlistId);
    if (response && response.message) {
      res.status(500).send(`Failed. ${response.message}`);
    } else {
      res.status(200).send(`Deleted the playlist with id ${playlistId}!`);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
}


// Exports
export {
  getPlaylists,
  getPlaylistById,
  getPlaylistsByUsername,
  createPlaylist,
  createPlaylistByUsername,
  updatePlaylist,
  updatePlaylistByUsername,
  deletePlaylist,
  deletePlaylistByUsername,
};