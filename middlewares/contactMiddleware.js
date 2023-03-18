const { AppError, catchAsync, contactValidator } = require("../utils");
const Contact = require("../service/schemas/contact");
const { ObjectId } = require("bson");

exports.checkContactId = catchAsync(async (req, _, next) => {
  const { contactId } = req.params;

  if (!ObjectId.isValid(contactId)) return next(new AppError(404, `Not found`));

  const idExist = await Contact.findOne({ _id: contactId });

  if (!idExist) return next(new AppError(404, `Not found`));

  next();
});

exports.checkCreateContactData = catchAsync(async (req, _, next) => {
  const { error, value } = contactValidator.createContactDataValidator(
    req.body
  );
  if (error) return next(new AppError(400, "Invalid contact data"));
  const contactExist = await Contact.exists({ email: value.email });

  if (contactExist)
    return next(new AppError(409, "Contact with this email already exists"));

  req.body = value;
  next();
});

exports.checkUpdateContactData = catchAsync(async (req, _, next) => {
  const { error, value } = contactValidator.updateContactDataValidator(
    req.body
  );
  if (error) return next(new AppError(400, "Invalid contact data"));
  const contactExist = await Contact.exists({ email: value.email });

  if (contactExist)
    return next(new AppError(409, "Contact with this email already exists"));

  req.body = value;
  next();
});

exports.checkFavoriteFieldInBody = catchAsync(async (req, _, next) => {
  if (!Object.keys(req.body).includes("favorite")) {
    return next(new AppError(400, "missing field favorite"));
  }
  next();
});
