import {
  v4 as uuidv4
} from 'uuid';

import { handleHTTPError } from '../../utils/index.js';
import * as userService from '../services/userService.js';
import User from '../models/User.js';
import { hashPassword } from '../../services/helper.js';

/**
 * Get all playlists
 */
const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    if (users.message) {
      res.status(404).send('Could not find users.');
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
};

/**
 * Get one user by username
 */
const getUserByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await userService.getUserByUsername(username);
    if (user.message) {
      res.status(404).send(`User with username [${username}] not found.`)
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
};

/**
 * Create one user
 */
const createUser = async (req, res, next) => {
  try {
    const { user } = req.body;
    const userToCreate = new User(
      uuidv4(),
      user.username,
      user.password,
      0,
      user.email
    );
    const response = await userService.createUser(userToCreate);
    if (response && response.message) {
      res.status(500).send(`Failed. ${response.message}`)
    } else {
      res.status(200).send(`Created a new user with username ${userToCreate.username}!`);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
};

/**
 * Update one user by username
 */
const updateUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { user } = req.body;
    if (user && user.password) {
      user.password = hashPassword(user.password);
    }
    const response = await userService.updateUser(username, user);
    if (response && response.message) {
      res.status(500).send(`Failed. ${response.message}`);
    } else {
      res.status(200).send(`Updated user with username ${username}!`);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
};


/**
 * Delete one user by username
 */
const deleteUser = async (req, res, next) => {
  try {
    const {
      username
    } = req.params;
    const response = await userService.deleteUser(username);
    if (response && response.message) {
      res.status(500).send('Failed.', response.message);
    } else {
      res.status(200).send(`Deleted user with username ${username}!`);
    }
  } catch (error) {
    handleHTTPError(error, next);
  }
}


// Exports
export {
  getUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
};