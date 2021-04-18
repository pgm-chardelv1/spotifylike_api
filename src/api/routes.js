/**
 * Import packages
 */
import express from 'express';

/**
 * Import custom packages
 */
import * as playlistController from './controllers/playlistController.js';
import * as songController from './controllers/songController.js';
import * as userController from './controllers/userController.js';
import { isAdminAuthenticated, isUserAuthorizedToView } from './middleware/auth.js';
import { validateSpotifyURI } from './middleware/uri.js';
import { validateSongIds } from './middleware/songId.js';

/**
 * Create a router
 */
const router = express.Router();

/**
 * Routes for users
 */
router.get('/users', isAdminAuthenticated, userController.getUsers);
router.get('/users/:username', isUserAuthorizedToView, userController.getUserByUsername);
router.post('/users', userController.createUser);
router.put('/users/:username', isUserAuthorizedToView, userController.updateUser);
router.delete('/users/:username', isUserAuthorizedToView, userController.deleteUser);

// User playlists
router.get('/users/:username/playlists', isUserAuthorizedToView, playlistController.getPlaylistsByUsername);
router.post('/users/:username/playlists', isUserAuthorizedToView, validateSongIds, playlistController.createPlaylistByUsername);
router.put('/users/:username/playlists/:playlistId', isUserAuthorizedToView, validateSongIds, playlistController.updatePlaylistByUsername);
router.delete('/users/:username/playlists/:playlistId',
isUserAuthorizedToView, playlistController.deletePlaylistByUsername);


/**
 * Routes for songs
 */
router.get('/songs', songController.getSongs);
router.get('/songs/:songId', songController.getSongById);
router.post('/songs', isAdminAuthenticated, validateSpotifyURI, songController.createSong);
router.put('/songs/:songId', isAdminAuthenticated, validateSpotifyURI, songController.updateSong);
router.delete('/songs/:songId', isAdminAuthenticated, songController.deleteSong);

/**
 * Routes for playlists
 */
router.get('/playlists', isAdminAuthenticated, playlistController.getPlaylists);
router.get('/playlists/:playlistId', isAdminAuthenticated, playlistController.getPlaylistById);
router.post('/playlists', isAdminAuthenticated, validateSongIds ,playlistController.createPlaylist);
router.put('/playlists/:playlistId', isAdminAuthenticated, validateSongIds, playlistController.updatePlaylist);
router.delete('/playlists/:playlistId', isAdminAuthenticated, playlistController.deletePlaylist);

/**
 * Export the router
 */
export default router;