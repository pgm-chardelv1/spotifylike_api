/**
 * Import packages
 */
import faker from 'faker';
faker.locale = "nl_BE";
import {
  v4 as uuidv4
} from 'uuid';

/**
 * Import custom packages
 */
import * as userService from '../api/services/userService.js';
import User from '../api/models/User.js';

/**
 * Generate [amount] users
 * @param {number} amount 
 */
const generateUsers = (amount) => {
  for (let i = 0; i < amount; i++) {
    const user = new User(
      uuidv4(),
      faker.internet.userName(),
      faker.internet.password(),
      Math.round(Math.random()),
      faker.internet.email(),
    )
    createEntryForUser(user);
  }
}

/**
 * Add user to user database
 */
const createEntryForUser = async (user) => {
  try {
    console.info(`Creating user: ${user.username}`);
    return await userService.createUser(user);
  } catch (e) {
    return console.error(e.message);
  }
}

// Call function and exit process
generateUsers(50);
process.exit(0);