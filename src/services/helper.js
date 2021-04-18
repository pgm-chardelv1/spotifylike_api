import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

/**
 *  Hash password 
 */
const hashPassword = (password) => {
  return bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
};

export { hashPassword };