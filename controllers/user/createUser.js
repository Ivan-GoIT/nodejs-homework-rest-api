const User = require('../../models/user');
const { catchAsync, signToken } = require('../../utils');
const Email = require('../../services/emailService');
const uuid = require('uuid').v4;

exports.createUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const verificationToken = signToken(uuid());

  const verificationUrl=`${process.env.BASE_URL}/api/users/verify/${verificationToken}`


  const user = await User.create({email, password, verificationToken});
  const { subscription } = user;

  try {
    await new Email(user, verificationUrl).sendHello();
  } catch (error) {
    console.log('Registration confirmation email not sent'); //status 501
  }

  res.status(201).json({
    user: { email, subscription },
  });
});
