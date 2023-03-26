const { catchAsync, userValidator, AppError } = require("../../utils");

exports.checkLoginUserData = catchAsync(async (req, _, next) => {
  const { error, value } = userValidator.loginUserDataValidator(req.body);

  if (error) return next(new AppError(400, error.details[0].message));

  req.body = value;

  next();
});
