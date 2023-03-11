const { readFile } = require("fs/promises");
const { CONTACTS_PATH } = require("../utils/constants/constants");

exports.checkContactId = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contactsFromDB = await JSON.parse(await readFile(CONTACTS_PATH));

    const contact = contactsFromDB.find(({ id }) => id === contactId);

    if (!contact) {
      return res
        .status(404)
        .json({ message: `No contact with id = ${contactId}` });
    }
    req.contact = contact;
    next();
  } catch (err) {
    next(err);
  }
};
