const { readFile, writeFile } = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const { AppError, catchAsync } = require("../utils");
const { CONTACTS_PATH } = require("../utils/constants/constants");
const {createContactDataValidator} = require("../utils/contactValidator");

const getContactsListController = catchAsync(async (req, res, next) => {
  const contactsList = await JSON.parse(await readFile(CONTACTS_PATH));
  if (!contactsList) {
    return next(new AppError(204, `Contacts list is empty`));
  }
  res.status(200).json({
    contactsList,
  });
});

const getContactByIdController = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contactsList = await JSON.parse(await readFile(CONTACTS_PATH));

  const contactById = contactsList.find(({ id }) => id === contactId);

  res.status(200).json({
    contact: contactById,
  });
});

const createContactController = catchAsync(async (req, res, next) => {
  const { error, value } = createContactDataValidator(req.body);

  if (error) {
    return next(new AppError(400, error.details[0].message));
  }

  const { name, email, phone } = value;

  const contactsList = await JSON.parse(await readFile(CONTACTS_PATH));

  const addedContact = { name, email, phone, id: uuidv4() };

  contactsList.push(addedContact);

  await writeFile(CONTACTS_PATH, JSON.stringify(contactsList), (error) => {
    if (error) {
      return next(new AppError(500, `Contact was not added`));
    }
  });

  res.status(201).json({ contact: addedContact });
});

const deleteContactController = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contactsList = await JSON.parse(await readFile(CONTACTS_PATH));

  const deletedContactIndex = contactsList.findIndex(
    ({ id }) => id === contactId
  );

  const deletedContact = contactsList[deletedContactIndex];
  contactsList.splice(deletedContactIndex, 1);

  await writeFile(CONTACTS_PATH, JSON.stringify(contactsList), (error) => {
    if (error) {
      return next(new AppError(500, `Contact was not deleted`));
    }
  });

  res.status(200).json({ contact: deletedContact });
});

const putContactController = catchAsync(async (req, res, next) => {
  const {
    params: { contactId },
    body,
  } = req;

  const contactsList = await JSON.parse(await readFile(CONTACTS_PATH));

  const updateContactIndex = contactsList.findIndex(
    ({ id }) => id === contactId
  );

  contactsList[updateContactIndex] = {
    ...contactsList[updateContactIndex],
    ...body,
  };

  await writeFile(CONTACTS_PATH, JSON.stringify(contactsList), (error) => {
    if (error) {
      return next(new AppError(500, `Contact was not deleted`));
    }
  });

  res.status(201).json(contactsList[updateContactIndex]);
});

module.exports = {
  getContactsListController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  putContactController,
};
