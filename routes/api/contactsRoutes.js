const express = require("express");
const {
  getContactsListController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  putContactController,
} = require("../../controller/contactController.js");

const router = express.Router();

router.get("/", getContactsListController);

router.get("/:contactId", getContactByIdController);

router.post("/", createContactController);

router.delete("/:contactId", deleteContactController);

router.put("/:contactId", putContactController);

module.exports = router;
