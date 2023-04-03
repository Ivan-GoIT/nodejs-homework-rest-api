const ImageService = require("../../services/ImageService");

exports.checkUserAvatar = ImageService.upload("avatar");