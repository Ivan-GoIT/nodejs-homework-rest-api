const { checkCreateUserData } = require('./checkCreateUserData');
const { checkLoginUserData } = require('./checkLoginUserData');
const { checkUserAvatar } = require('./checkUserAvatar');
const { checkUserToken } = require('./checkUserToken');

module.exports = {
  checkCreateUserData,
  checkLoginUserData,
  checkUserToken,
  checkUserAvatar,
};
