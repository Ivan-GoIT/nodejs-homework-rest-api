const ImageService = require('../../services/imageService');

exports.checkUserAvatar = ImageService.upload('avatar');
