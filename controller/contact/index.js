const { getContactsList } = require("./getContactsList");
const { getContactById } = require("./getContactById");
const { createContact } = require("./createContact");
const { deleteContact } = require("./deleteContact");
const { putContact } = require("./putContact");
const { patchContactFavoriteField } = require("./patchContactFavoriteField");

module.exports = {
  getContactsList,
  getContactById,
  createContact,
  deleteContact,
  putContact,
  patchContactFavoriteField,
};
