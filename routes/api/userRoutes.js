const { Router } = require("express");
const { loginUser, createUser } = require("../../controller/user");
const {
  checkCreateUserData,
  checkLoginUserData,
} = require("../../middlewares/user");

const router = Router();

router.route("/register").post(checkCreateUserData, createUser);

router.route("/login").post(checkLoginUserData, loginUser);

module.exports = router;
