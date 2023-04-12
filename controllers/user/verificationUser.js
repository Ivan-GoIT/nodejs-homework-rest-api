const User = require('../../models/user');
const { catchAsync, AppError } = require('../../utils');

exports.verificationUser = catchAsync(async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOneAndUpdate({ verificationToken },{verificationToken:null,verify: true});

  if (!user) return new AppError(404, 'User not found');

  res.status(200).json({ message: 'Verification successful' });
});


