const multer = require('multer');
const fse = require('fs-extra');
const path = require('path');
const Jimp = require('jimp');
const uuid = require('uuid').v4;
const { AppError } = require('../utils');

class ImageService {
  static upload(name) {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, cb) => {
      if (file.mimetype.startsWith('image')) {
        cb(null, true);
      } else {
        cb(new AppError(400, 'Upload imajes only...'), false);
      }
    };
    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }).single(name);
  }

  static async save(file, ...pathSegments) {
    const fileName = `${uuid()}.jpeg`;
    const fullFilePath = path.join(process.cwd(), 'public', ...pathSegments);

    await fse.ensureDir(fullFilePath);

    await Jimp.read(file.buffer)
      .then(image => {
        image.cover(250, 250).write(path.join(fullFilePath, fileName));
      })
      .catch(() => {
        throw new AppError(400, 'Something wrong with image...');
      });

    return path.join(...pathSegments, fileName);
  }
}

module.exports = ImageService;
