const Joi = require("joi");
exports.createContactDataValidator = (data) =>
  Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  }).validate(data);
