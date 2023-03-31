const User = require("../../models/user");
const { updateToken } = require("../../service");
const { catchAsync, AppError } = require("../../utils");

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password ");

  if (!user) return next(new AppError(401, "Email or password is wrong"));

  const passwordIsValid = await user.checkPassword(password, user.password);

  if (!passwordIsValid)
    return next(new AppError(401, "Email or password is wrong"));

  const updatedUser = await updateToken(user._id);

  if (!updatedUser) return next(new AppError(503, "Service Unavailable"));

  res.status(200).json({
    token: updatedUser.token,
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
});
