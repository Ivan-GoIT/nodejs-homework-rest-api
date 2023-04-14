const User = require('../../models/user');
const Email = require('../../services/emailService');

const { catchAsync, AppError, verificationData } = require('../../utils');

exports.reverifyUser = catchAsync(async (req, res) => {
  const { email } = req.body;

  if (!email) return new AppError(400, 'missing required field email');

  const user = await User.findOne({ email });

  if (!user) return new AppError(400, 'Bad Request');

  if (user.verify)
    return new AppError(400, 'Verification has already been passed');

  const { verificationToken, verificationUrl } = verificationData();

  user.verificationToken = verificationToken;

  await user.save();

  try {
    await new Email(user, verificationUrl).sendHello();
  } catch (error) {
    console.log('Registration confirmation email not sent');
  }

  res.status(200).json({ email });
});
