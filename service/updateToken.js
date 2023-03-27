const User = require("../service/schemas/user");
const signToken = require("./signToken");

const updateToken = (id) => User.findByIdAndUpdate(id, { token: signToken },{new:true});

module.exports = updateToken;
