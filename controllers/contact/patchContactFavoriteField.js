const { catchAsync } = require('../../utils');
const { updateStatusContact } = require('../../utils/updateStatusContact');

exports.patchContactFavoriteField = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await updateStatusContact(
    contactId,
    req.body.favorite
  );

  res.status(200).json({ contact: updatedContact });
});
