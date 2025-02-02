const { Router } = require('express');
const {
  loginUser,
  createUser,
  logoutUser,
  currentUser,
  updateUserAvatar,
  verificationUser,
  reverifyUser,
} = require('../../controllers/user');
const {
  checkCreateUserData,
  checkLoginUserData,
  checkUserToken,
  checkUserAvatar,
} = require('../../middlewares/user');

const router = Router();

router
  .post('/register', checkCreateUserData, createUser)
  .post('/login', checkLoginUserData, loginUser)
  .get('/verify/:verificationToken',verificationUser)
  .post('/verify',reverifyUser);

router.use(checkUserToken);

router
  .get('/current', currentUser)
  .get('/logout/:userId', logoutUser)
  .patch('/avatars', checkUserAvatar, updateUserAvatar);

module.exports = router;
