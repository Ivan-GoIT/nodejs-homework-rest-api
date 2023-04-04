const User = require('../../models/user');
const fse = require('fs-extra');
const path = require('path');
const ImageService = require('../../services/ImageService');
const { catchAsync } = require('../../utils');

exports.updateUserAvatar = catchAsync(async (req, res, next) => {
  const { file, user } = req;

  const avatarURL = await ImageService.save(file, 'images', 'users', user.id);

  await fse.remove(path.join('public', user.avatarURL));

  await User.findByIdAndUpdate(user.id, { avatarURL });

  res.status(200).json({
    user,
    avatarURL,
  });
});
