const User = require('../../models/user');
const { catchAsync, AppError } = require('../../utils');

exports.logoutUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findByIdAndUpdate(
    userId,
    { token: null },
    { new: true }
  );

  if (!user) return next(new AppError(401, 'Not authorized'));

  res.sendStatus(204);
});
