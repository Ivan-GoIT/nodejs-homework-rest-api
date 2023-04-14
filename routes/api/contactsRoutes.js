const { Router } = require('express');
const {
  getContactsList,
  getContactById,
  createContact,
  deleteContact,
  putContact,
  patchContactFavoriteField,
} = require('../../controllers/contact');
const {
  checkContactId,
  checkCreateContactData,
  checkFavoriteFieldInBody,
  checkUpdateContactData,
} = require('../../middlewares/contact');
const { checkUserToken } = require('../../middlewares/user');

const router = Router();

router.use(checkUserToken);

router
  .route('/')
  .get(getContactsList)
  .post(checkCreateContactData, createContact);

router.use('/:contactId', checkContactId);
router
  .route('/:contactId')
  .get(getContactById)
  .delete(deleteContact)
  .put(checkUpdateContactData, putContact)
  .patch(checkFavoriteFieldInBody, patchContactFavoriteField);

module.exports = router;
