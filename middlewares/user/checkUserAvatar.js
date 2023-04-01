const multer = require("multer");
// const { AppError } = require("../../utils");
// const uuid = require("uuid").v4;

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/img/users");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];

//     cb(null, `${req.user.id}-${uuid()}.${ext}`);
//   },
// });

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new AppError(400, "Upload imajes only..."), false);
//   }
// };

// exports.checkUserAvatar = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//   },
// }).single("avatar");

exports.checkUserAvatar = 
