const Joi = require("joi");
const PASSWD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\\$%\\^&\\*]).{8,128}$/;

console.log("contactValidator PASSWD_REGEX", PASSWD_REGEX);

exports.createContactDataValidator = (data) =>
  Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      "any.required": `missing required "name" field`,
    }),
    email: Joi.string().email().required().messages({
      "any.required": `missing required "email" field`,
    }),
    phone: Joi.string().required().messages({
      "any.required": `missing required "phone" field`,
    }),
    favorite: Joi.boolean(),
  }).validate(data);
