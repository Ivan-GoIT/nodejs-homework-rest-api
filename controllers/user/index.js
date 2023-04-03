const { createUser } = require("./createUser");
const { currentUser } = require("./currentUser");
const { loginUser } = require("./loginUser");
const { logoutUser } = require("./logoutUser");
const { updateUserAvatar } = require("./updateUserAvatar");

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUserAvatar,
};
