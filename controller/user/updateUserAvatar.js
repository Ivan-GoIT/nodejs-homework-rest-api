const { catchAsync } = require("../../utils");

exports.updateUserAvatar = catchAsync(async (req, res, next) => {

    
  res.status(200).json({
    user: req.user,
  });
});
