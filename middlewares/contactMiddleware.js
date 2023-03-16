const { readFile } = require("fs/promises");
const { CONTACTS_PATH } = require("../utils/constants/constants");
const { AppError, catchAsync, contactValidator } = require("../utils");

exports.checkContactId = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const contactsFromDB = await JSON.parse(await readFile(CONTACTS_PATH));

  const contact = contactsFromDB.find(({ id }) => id === contactId);

  if (!contact) {
    return next(new AppError(404, `Not found`));
  }

  req.contact = contact;
  next();
});

exports.checkCreateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = contactValidator.createContactDataValidator(
    req.body
  );
  if (error) {
    return next(new AppError(400, "Invalid contact data"));
  }
  req.body = value;
  next();
});
