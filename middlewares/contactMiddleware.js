const { readFile } = require("fs/promises");
const { CONTACTS_PATH } = require("../utils/constants/constants");
const { AppError, catchAsync} = require("../utils");

exports.checkContactId =catchAsync (async (req, res, next) => {
    const { contactId } = req.params;

    const contactsFromDB = await JSON.parse(await readFile(CONTACTS_PATH));

    const contact = contactsFromDB.find(({ id }) => id === contactId);

    if (!contact) {
      return next(new AppError(404, `Invalid Id`));
    }

    req.contact = contact;
    next();
});
