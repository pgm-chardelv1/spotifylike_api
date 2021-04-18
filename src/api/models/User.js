/**
 * User class
 */
import { hashPassword } from '../../services/helper.js';

export default class User {
  constructor(id, username, password, is_admin, email) {
    this.id = id;
    this.username = username;
    this.password = hashPassword(password);
    this.is_admin = is_admin;
    this.email = email;
  }
};
