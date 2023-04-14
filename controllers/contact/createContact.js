const Contact = require('../../models/contact');
const { catchAsync } = require('../../utils');

exports.createContact = catchAsync(async (req, res) => {
  const contact = await Contact.create({
    favorite: false,
    ...req.body,
    owner: req.user,
  });
  res.status(201).json({ contact });
});
