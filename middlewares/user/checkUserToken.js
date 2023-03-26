const { catchAsync, AppError } = require("../../utils");
const jwt = require("jsonwebtoken");
const User = require("../../service/schemas/user");

exports.checkUserToken = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  if (!token) return next(new AppError(401, "Not authorized"));

  const decoded = jwt.verify(token, process.env.JWT_SALT);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser||currentUser.token!==token) return next(new AppError(401, "Not authorized"));


  req.user=currentUser
  next()

});
