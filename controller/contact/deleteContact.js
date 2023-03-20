const Contact = require("../../service/schemas/contact");
const { catchAsync } = require("../../utils");

exports.deleteContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findByIdAndDelete(contactId);

  res.status(200).json({ contact, message: "contact deleted" });
});
