const { readFile, writeFile } = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const { CONTACTS_PATH } = require("../utils/constants/constants");

const getContactsListController = async (req, res, next) => {
  try {
    const contactsList = await JSON.parse(await readFile(CONTACTS_PATH));
    if (!contactsList) {
      throw new Error("Contacts list is empty");
    }
    res.status(200).json({
      contactsList,
    });
  } catch (error) {
    next(error);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactsList = await JSON.parse(await readFile(CONTACTS_PATH));

    const contactById = contactsList.find(({ id }) => id === contactId);
    if (!contactById) {
      throw new Error(`Invalid Id`);
    }

    res.status(200).json({
      contact: contactById,
    });
  } catch (error) {
    next(error);
  }
};

const createContactController = async (req, res, next) => {
  try {
    const contactsList = await JSON.parse(await readFile(CONTACTS_PATH));

    const addedContact = { ...req.body, id: uuidv4() };

    contactsList.push(addedContact);

    await writeFile(CONTACTS_PATH, JSON.stringify(contactsList), (error) => {
      if (error) {
        throw new Error(`Contact was not added`);
      }
    });

    res.status(201).json({ contact: addedContact });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactsList = await JSON.parse(await readFile(CONTACTS_PATH));

    const deletedContactIndex = contactsList.findIndex(
      ({ id }) => id === contactId
    );

    if (deletedContactIndex === -1) {
      console.log(`No contact with id = ${contactId}`);
      return undefined;
    }

    const deletedContact = contactsList[deletedContactIndex];
    contactsList.splice(deletedContactIndex, 1);

    await writeFile(CONTACTS_PATH, JSON.stringify(contactsList), (error) => {
      if (error) {
        throw new Error(`Contact was not deleted`);
      }
    });

    res.status(200).json({ contact: deletedContact });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const putContactController = async (req, res, next) => {
  try {
    const {
      params: { contactId },
      body,
    } = req;

    const contactsList = await JSON.parse(await readFile(CONTACTS_PATH));

    const updateContactIndex = contactsList.findIndex(
      ({ id }) => id === contactId
    );

    if (updateContactIndex === -1) {
      console.log(`No contact with id = ${contactId}`);
      return undefined;
    }

    contactsList[updateContactIndex] = {
      ...contactsList[updateContactIndex],
      ...body,
    };

    await writeFile(CONTACTS_PATH, JSON.stringify(contactsList), (error) => {
      if (error) {
        throw new Error(`Contact was not deleted`);
      }
    });

    res.status(201).json(contactsList[updateContactIndex]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getContactsListController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  putContactController,
};
