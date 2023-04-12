const { Router } = require('express');
const {
  loginUser,
  createUser,
  logoutUser,
  currentUser,
  updateUserAvatar,
  verifikationUser,
} = require('../../controllers/user');
const {
  checkCreateUserData,
  checkLoginUserData,
  checkUserToken,
  checkUserAvatar,
} = require('../../middlewares/user');
const { verify } = require('jsonwebtoken');

const router = Router();

router
  .post('/register', checkCreateUserData, createUser)
  .post('/login', checkLoginUserData, loginUser)
  .get('/verify/:verificationToken',verifikationUser)
  .post('/verify',verificationUser);

router.use(checkUserToken);

router
  .get('/current', currentUser)
  .get('/logout/:userId', logoutUser)
  .patch('/avatars', checkUserAvatar, updateUserAvatar);

module.exports = router;
