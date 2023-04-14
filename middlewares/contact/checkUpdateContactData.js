const Contact = require('../../models/contact');
const { catchAsync, AppError, contactValidator } = require('../../utils');

exports.checkUpdateContactData = catchAsync(async (req, _, next) => {
  const { error, value } = contactValidator.updateContactDataValidator(
    req.body
  );
  if (error) return next(new AppError(400, 'Invalid contact data'));
  const contactExist = await Contact.exists({ email: value.email });

  if (contactExist)
    return next(new AppError(409, 'Contact with this email already exists'));

  req.body = value;
  next();
});
