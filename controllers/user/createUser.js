const User = require('../../models/user');
const { catchAsync } = require('../../utils');
const Email=require('../../services/emailService')

exports.createUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  const { email, subscription } = user;

  await new Email(user,'localhost:3000/users/ping').sendHello()

  res.status(201).json({
    user: { email, subscription },
  });
});
