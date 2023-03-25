const User = require("../../service/schemas/user");
const { catchAsync, userValidator, AppError } = require("../../utils");

exports.checkCreateUserData = catchAsync(async (req, _, next) => {
  const { error, value } = userValidator.createUserDataValidator(req.body);

  if (error) return next(new AppError(400, error.details[0].message));

  const userExists = await User.exists({ email: value.email });

  if (userExists) return next(new AppError(409, "Email in use"));

  req.body = value;

  next();
});
