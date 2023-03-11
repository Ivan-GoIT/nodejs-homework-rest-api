const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve("models", "contactsModel.json");

/**
 * @returns {Promise<Array<object>>} - Contacts Array
 */
async function listContacts() {
  try {
    return await JSON.parse(await readFile(contactsPath));
  } catch (err) {
    console.log('Read file error');
  }
}

/**
 * @param {string} contactId
 * @returns {Promise<object>} contact object
 */
async function getContactById(contactId) {
  try {
    const contacts = await listContacts(contactsPath);

    const resContact = contacts.filter(
      (contact) => contactId === contact.id
    )[0];
    if (!resContact) {
      console.log(`Contact with id ${contactId} isn't found`);
      return {};
    }
    return resContact;
  } catch (err) {
    console.log(err);
  }
}

/**
 * @param {string} contactId
 * @returns {Promise<object>} removed object
 */
async function removeContact(contactId) {
  try {
    const removedContact = await getContactById(contactId);

    const contacts = await listContacts(contactsPath);
    const resContact = contacts.filter((contact) => contactId !== contact.id);

    await writeFile(contactsPath, JSON.stringify(resContact));

    return removedContact;
  } catch (err) {
    console.log(err);
  }
}

/**
 * @param {string} name
 * @param {string} email
 * @param {string} phone
 * @returns {Promise<object>} addContact
 */
async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts(contactsPath);

    const addedContact = { id: uuidv4(), name, email, phone };

    contacts.push(addedContact);

    await writeFile(contactsPath, JSON.stringify(contacts));

    return addedContact;
  } catch (err) {
    console.log(err);
  }
}

/**
 * @param {string} contactId
 * @param {'object'} body
 * @returns {'object'} - updated contact
 */
const updateContact = async (contactId, body) => {
  try {
    if (!Object.keys(body).length) {
      return undefined;
    }
    const contacts = await listContacts();

    const updateContactIndex = contacts.findIndex(
      (item) => item.id === contactId
    );

    if (updateContactIndex === -1) {
      console.log(`No contact with id = ${contactId}`);
      return undefined;
    }

    const newContact = { ...contacts[updateContactIndex], ...body };

    contacts.splice(updateContactIndex, 1, newContact);

    await writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;
  } catch (err) {
    console.log("Updating error", err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
