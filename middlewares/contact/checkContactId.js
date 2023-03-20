const { ObjectId } = require("bson");
const Contact = require("../../service/schemas/contact");
const { catchAsync, AppError } = require("../../utils");

exports.checkContactId = catchAsync(async (req, _, next) => {
    const { contactId } = req.params;
  
    if (!ObjectId.isValid(contactId)) return next(new AppError(404, `Not found`));
  
    const idExist = await Contact.findOne({ _id: contactId });
  
    if (!idExist) return next(new AppError(404, `Not found`));
  
    next();
  });
  