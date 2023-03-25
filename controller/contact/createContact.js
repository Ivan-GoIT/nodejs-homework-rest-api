const Contact = require("../../service/schemas/contact");
const { catchAsync } = require("../../utils");

exports.createContact = catchAsync(async (req, res) => {
  const contact = await Contact.create({ favorite: false, ...req.body });
  res.status(201).json({ contact });
});
