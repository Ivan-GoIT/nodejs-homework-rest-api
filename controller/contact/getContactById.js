const Contact = require("../../service/schemas/contact");
const { catchAsync } = require("../../utils");

exports.getContactById = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  res.status(200).json({
    contact: contact,
  });
});
