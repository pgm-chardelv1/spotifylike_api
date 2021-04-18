/**
 * Import knex file
 */
import knexMusic from '../../../db/knexMusic.js';
import { logger } from '../../services/logger.js';

/**
 * Find a user by username
 * @param {string} username 
 * @returns a user from the database
 */
const getUserByUsername = async (username) => {
  try {
    const user = await knexMusic('users')
      .where({
        username: username
      })
      .select('*')
      .first()
    if (user === undefined) throw new Error(`Could not find user with username: ${username}.`);
    logger.log({level: 'info', message: `Retrieved user with username: ${username}.`, label: 'user'});
    return user;
  } catch (e) {
    logger.log({
      level: 'error',
      message: e.message,
      label: 'user'
    });
    return e;
  }
};

/**
 * @returns all users
 */
const getUsers = async () => {
  try {
    const users = await knexMusic('users')
      .select('*');
    if (users.length === 0) throw new Error('No users found.');
    logger.log({level: 'info', message: 'Fetched all users.', label: 'user'});
    return users;
  } catch (e) {
    logger.log({
      level: 'error',
      message: e.message,
      label: 'user'
    });
    return e;
  }
}

/**
 * Create a new user in the database
 * @param {object} user 
 */
const createUser = async (user) => {
  try {
    await knexMusic('users')
      .where('username', user.username)
      .andWhere('email', user.email)
      .then(async userNameList => {
        if (userNameList.length === 0) {
          const createdUser = await knexMusic('users')
            .insert({
              id: user.id,
              username: user.username,
              password: user.password,
              is_admin: user.is_admin,
              email: user.email,
            })
            .then((newUserId) => {
              logger.log({level: 'info', message: `Inserted a new user at row: ${newUserId}.`, label: 'user'});
            });
          return createdUser;
        }
        throw new Error('Not inserting user because of a database conflict. Username and/or email already known.');
      });
  } catch (e) {
    logger.log({
      level: 'error',
      message: e.message,
      label: 'user'
    });
    return e;
  }
}

/**
 * Update a user in the database
 * @param {string} id 
 * @param {object} user 
 */
const updateUser = async (username, user) => {
  try {
    const updatedUser = await knexMusic('users').where('username', username).update({
      username: user.username,
      password: user.password,
      email: user.email,
    });
    if (!(!!updatedUser)) throw new Error(`Could not update the user with username: ${username}.`);
    logger.log({level: 'info', message: `Updated the user with username: ${username} with info: ${user}.`, label: 'user'});
    return updatedUser;
  } catch (e) {
    logger.log({
      level: 'error',
      message: e.message,
      label: 'user'
    });
    return e;
  }
}

/**
 * Delete a user in the database
 * @param {string} username
 */
const deleteUser = async (username) => {
  try {
    const deletedUser = await knexMusic('users')
      .where('username', username)
      .del()
    if (!(!!deletedUser)) throw new Error(`Could not delete the user with username: ${username}.`);
    logger.log({level:'info', message:`Deleted the user with username: ${username}.`, label: 'user'});
    return deletedUser;
  } catch (e) {
    logger.log({
      level: 'error',
      message: e.message,
      label: 'user'
    });
    return e;
  }
}

export {
  getUserByUsername,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
}
