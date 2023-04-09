const { createUser } = require('./createUser');
const { currentUser } = require('./currentUser');
const { loginUser } = require('./loginUser');
const { logoutUser } = require('./logoutUser');
const { updateUserAvatar } = require('./updateUserAvatar');
const { verifikationUser } = require('./verifikationUser');

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUserAvatar,
  verifikationUser,
};
