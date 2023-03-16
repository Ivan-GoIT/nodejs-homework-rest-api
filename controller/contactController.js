const { createContact, getAllContacts } = require("../service");
const { catchAsync } = require("../utils");

const getContactsListController = catchAsync(async (req, res, next) => {
  const contacts = await getAllContacts();
  // if (!contactsList) {
  //   return next(new AppError(204, `Contacts list is empty`));
  // }
  res.status(200).json({ contacts });
});

const getContactByIdController = catchAsync(async (req, res, next) => {
  // const { contactId } = req.params;
  // const contactsList = await JSON.parse(await readFile(CONTACTS_PATH));

  // const contactById = contactsList.find(({ id }) => id === contactId);

  res.status(200).json({
    contact: req,
  });
});

const createContactController = catchAsync(async (req, res, next) => {
  const contact = await createContact(req.body);
  contact.favorite = undefined;
  res.status(201).json({ contact });
});

const deleteContactController = catchAsync(async (req, res, next) => {
  // const { contactId } = req.params;
  // const contactsList = await JSON.parse(await readFile(CONTACTS_PATH));

  // const deletedContactIndex = contactsList.findIndex(
  //   ({ id }) => id === contactId
  // );

  // contactsList.splice(deletedContactIndex, 1);

  // await writeFile(CONTACTS_PATH, JSON.stringify(contactsList), (error) => {
  //   if (error) {
  //     return next(new AppError(500, `Contact was not deleted`));
  //   }
  // });

  res.status(200).json({ message: "contact deleted" });
});

const putContactController = catchAsync(async (req, res, next) => {
  // const {
  //   params: { contactId },
  //   body,
  // } = req;

  // if (!Object.keys(body).length)
  //   return next(new AppError(400, "missing fields"));

  // const contactsList = await JSON.parse(await readFile(CONTACTS_PATH));

  // const updateContactIndex = contactsList.findIndex(
  //   ({ id }) => id === contactId
  // );

  // const updatedContact = {
  //   ...contactsList[updateContactIndex],
  //   ...body,
  // };

  // const { id, name, email, phone } = updatedContact;

  // const { error, value } = contactValidator.createContactDataValidator({ name, email, phone });

  // if (error) {
  //   return next(new AppError(400, error.details[0].message));
  // }

  // contactsList[updateContactIndex] = { id, ...value };

  // await writeFile(CONTACTS_PATH, JSON.stringify(contactsList), (error) => {
  //   if (error) {
  //     return next(new AppError(500, `Contact was not deleted`));
  //   }
  // });

  res.status(201).json("Contact update");
});

module.exports = {
  getContactsListController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  putContactController,
};
