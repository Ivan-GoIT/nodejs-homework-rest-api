const Contact = require('../../models/contact');
const { catchAsync } = require('../../utils');

exports.putContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  res.status(201).json({ contact: updatedContact, message: 'Contact update' });
});
