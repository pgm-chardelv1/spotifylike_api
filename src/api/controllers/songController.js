import { v4 as uuidv4 } from 'uuid';

import { handleHTTPError } from '../../utils/index.js';
import * as songService from '../services/songService.js';
import Song from '../models/Song.js';

/**
 * Get all songs
 */
const getSongs = async (req, res, next) => {
  try {
    const songs = await songService.getSongs();
    if (songs && songs.message) {
      res.status(404).send('Failed.', songs.message);
    } else {
      res.status(200).json(songs);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
};

/**
 * Get one song by songId
 */
const getSongById = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const song = await songService.getSongById(songId);
    if (song && song.message) {
      res.status(404).send('Failed.', song.message)
    } else {
      res.status(200).json(song);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
};

/**
 * Create one song
 */
const createSong = async (req, res, next) => {
  try {
    const { song } = req.body;
    const songToCreate = new Song(
      uuidv4(), 
      song.title, 
      song.artist, 
      song.uri, 
      Date.now()
      );
    const response = await songService.createSong(songToCreate);
    if (response && response.message) {
      res.status(400).send(`Failed. ${response.message}`);
    } else {
      res.status(201).send(`Created song ${songToCreate.title} by ${songToCreate.artist}!`);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
};

/**
 * Update one song by songId
 */
const updateSong = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const { song } = req.body;
    const response = await songService.updateSong(songId, song);
    if (response && response.message) {
      res.status(400).send(`Failed. ${response.message}`)
    } else {
      res.status(200).send(`Updated the song with id ${songId}!`);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
};

/**
 * Delete one song by songId
 */
const deleteSong = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const response = await songService.deleteSong(songId); 
    if (response && response.message) {
      res.status(500).send(`Failed. ${response.message}`);
    } else {
      res.status(200).send(`Deleted the song with id ${songId}!`);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
};

export {
  getSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
};
