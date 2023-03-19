const Contact = require("../service/schemas/contact");
const { catchAsync } = require("../utils");
const { updateStatusContact } = require("../utils/updateStatusContact");

const getContactsListController = catchAsync(async (_, res) => {
  const contacts = await Contact.find().select("-_id ");
  res.status(200).json({ data: contacts });
});

const getContactByIdController = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  res.status(200).json({
    contact: contact,
  });
});

const createContactController = catchAsync(async (req, res) => {
  const contact = await Contact.create({ favorite: false, ...req.body });
  contact.favorite = undefined;
  res.status(201).json({ contact });
});

const deleteContactController = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findByIdAndDelete(contactId);

  res.status(200).json({ contact, message: "contact deleted" });
});

const putContactController = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  res.status(201).json({ contact: updatedContact, message: "Contact update" });
});

const patchContactFavoriteFieldController = catchAsync(
  async (req, res) => {
    const { contactId } = req.params;
    console.log("req.body.favorite ", req.body.favorite);
    const updatedContact = await updateStatusContact(
      contactId,
      req.body.favorite
    );

    res.status(200).json({ contact: updatedContact });
  }
);

module.exports = {
  getContactsListController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  putContactController,
  patchContactFavoriteFieldController,
};
