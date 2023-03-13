const { Router } = require("express");
const {
  getContactsListController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  putContactController,
} = require("../../controller/contactController.js");
const { checkContactId } = require("../../middlewares");

const router = Router();

router.route("/").get(getContactsListController).post(createContactController);

router.use("/:contactId", checkContactId);
router
  .route("/:contactId")
  .delete(deleteContactController)
  .get(getContactByIdController)
  .put(putContactController);

module.exports = router;
