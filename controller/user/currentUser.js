const User = require("../../service/schemas/user");
const { catchAsync, AppError } = require("../../utils");

exports.currentUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) return next(new AppError(401, "Not authorized"));

  const { email, subscription } = user;

  res.status(200).json({
    email,
    subscription,
  });
});
