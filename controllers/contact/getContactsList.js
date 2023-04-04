const Contact = require('../../models/contact');
const { catchAsync, searchOptions } = require('../../utils/index');

exports.getContactsList = catchAsync(async (req, res) => {
  const { limit, page, favorite, name, email, phone } = req.query;

  const searchObj = searchOptions(favorite, name, email, phone);

  const paginationPage = +page || 1;
  const paginationLimit = +limit || 5;

  const skip = (paginationPage - 1) * paginationLimit;

  const contacts = await Contact.find(searchObj)
    .select('-_id -owner')
    .skip(skip)
    .limit(paginationLimit);

  const total = await Contact.count();

  res.status(200).json({ data: contacts, total });
});
