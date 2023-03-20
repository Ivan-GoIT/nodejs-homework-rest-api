const { catchAsync, AppError } = require("../../utils");

exports.checkFavoriteFieldInBody = catchAsync(async (req, _, next) => {
  if (!Object.keys(req.body).includes("favorite")) {
    return next(new AppError(400, "missing field favorite"));
  }
  next();
});
