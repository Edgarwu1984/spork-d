const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10h' });
};

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const matchPassword = async (enteredPassword, userPassword) => {
  return await bcrypt.compare(enteredPassword, userPassword);
};

module.exports = { generateToken, hashPassword, matchPassword };
