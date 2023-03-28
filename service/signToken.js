const jwt = require("jsonwebtoken");


const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SALT, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  module.exports=signToken