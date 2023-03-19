const { Router } = require("express");
const {
  getContactsListController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  putContactController,
  patchContactFavoriteFieldController,
} = require("../../controller/contactController.js");
const { checkContactId, checkCreateContactData } = require("../../middlewares");
const {
  checkFavoriteFieldInBody,
  checkUpdateContactData,
} = require("../../middlewares/contactMiddleware.js");

const router = Router();

router
  .route("/")
  .get(getContactsListController)
  .post(checkCreateContactData, createContactController);

router.use("/:contactId", checkContactId);
router
  .route("/:contactId")
  .get(getContactByIdController)
  .delete(deleteContactController)
  .put(checkUpdateContactData, putContactController)
  .patch(checkFavoriteFieldInBody, patchContactFavoriteFieldController);

module.exports = router;
