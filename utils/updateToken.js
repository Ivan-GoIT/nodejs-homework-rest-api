const User = require('../models/user');
const signToken = require('./signToken');

const updateToken = id =>
  User.findByIdAndUpdate(id, { token: signToken(id) }, { new: true });

module.exports = updateToken;
