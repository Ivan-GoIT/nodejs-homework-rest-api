const User = require("../../service/schemas/user");
const { catchAsync } = require("../../utils");



exports.createUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  const { email, subscription } = user;

  res.status(201).json({
    user: { email, subscription },
  });
});
