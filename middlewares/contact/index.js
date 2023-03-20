const { checkContactId } = require("./checkContactId");
const { checkCreateContactData } = require("./checkCreateContactData");
const { checkFavoriteFieldInBody } = require("./checkFavoriteFieldInBody");
const { checkUpdateContactData } = require("./checkUpdateContactData");

module.exports = {
  checkContactId,
  checkCreateContactData,
  checkUpdateContactData,
  checkFavoriteFieldInBody,
};
