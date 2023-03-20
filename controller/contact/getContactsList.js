const Contact = require("../../service/schemas/contact");
const { catchAsync } = require("../../utils/index");

exports.getContactsList = catchAsync(async (_, res) => {
  const contacts = await Contact.find().select("-_id ");
  res.status(200).json({ data: contacts });
});
