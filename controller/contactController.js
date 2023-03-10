const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../utils/contactsUtils");

const getContactsListController = async (req, res, next) => {
  try {
    const contactsList = await listContacts();
    if (!contactsList) {
      throw new Error("Contacts list is empty");
    }
    res.status(200).json({
      contactsList,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await getContactById(contactId);
    console.log(contactById);

    if (!contactById) {
      throw new Error(`No contact with id = ${contactId}`);
    }
    res.status(200).json({
      contactById,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createContactController = async (req, res, next) => {
  try {
    const addedContact = await addContact(req.body);

    if (!addContact) {
      throw new Error(`Contact was not added`);
    }

    res.status(201).json({ contact: addedContact });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    const deletedContact = await removeContact(req.params.contactId);

    if (!addContact) {
      throw new Error(`Contact was not removed`);
    }

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
    const prevContact = await getContactById(req.params.contactId);
    const newContact = await updateContact(contactId, body);

    if (!newContact) {
      throw new Error(`Contact ${prevContact} was not updated`);
    }

    res.status(201).json({ ...prevContact, ...newContact });
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
