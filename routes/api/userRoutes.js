const { Router } = require("express");
const { 
  loginUser, 
  createUser, 
  logoutUser,
  currentUser, 
} = require("../../controller/user");
const {
  checkCreateUserData,
  checkLoginUserData,
  checkUserToken,
} = require("../../middlewares/user");

const router = Router();

router
  .post("/register", checkCreateUserData, createUser)
  .post("/login", checkLoginUserData, loginUser)
  .get("/logout/:userId", logoutUser)
  .get("/current/:userId",checkUserToken, currentUser);

module.exports = router;
