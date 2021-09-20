const bcrypt = require('bcryptjs');

const matchPassword = async (enteredPassword, userPassword) => {
  return await bcrypt.compare(enteredPassword, userPassword);
};

module.exports = matchPassword;
