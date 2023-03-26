const User = require("../../service/schemas/user");
const { catchAsync, AppError } = require("../../utils");

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password -_id");

  if (!user) return next(new AppError(401, "Email or password is wrong"));

  const passwordIsValid = await user.checkPassword(password, user.password);

  if (!passwordIsValid)
    return next(new AppError(401, "Email or password is wrong"));


  user.password = undefined;

  res.status(200).json({
    token:user.token,
    user:{email:user.email,subscription:user.subscription},
  });
});
