const express = require("express");
const {
  getContactsListController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  putContactController,
} = require("../../controller/contactController.js");

const router = express.Router();

router.route("/")
.get(getContactsListController)
.post(createContactController);

router.route("/:contactId")
  .delete(deleteContactController)
  .get(getContactByIdController)
  .put(putContactController);

module.exports = router;
