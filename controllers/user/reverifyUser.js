const User = require('../../models/user');
const { catchAsync, AppError, verificationURL } = require('../../utils');

exports.verificationUser = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) return new AppError(400, 'missing required field email');

  const user = await User.findOne({ email });

  if(!user.verify) return new AppError(400, 'Verification has already been passed');

  const { verificationToken, verificationUrl } = verificationData;

  user.verificationToken=verificationToken

  await user.save();

  try {
    await new Email(user, verificationURL).sendHello();
  } catch (error) {
    console.log('Registration confirmation email not sent'); //status 501
  }

  res.status(200).json({ message: 'Verification email sent' });
});