const { Router } = require("express");
const { createUser } = require("../../controller/user/createUser");
const { checkCreateUserData } = require("../../middlewares/user");

const router=Router()

router
.route('/register')
.post(checkCreateUserData,createUser)

module.exports=router