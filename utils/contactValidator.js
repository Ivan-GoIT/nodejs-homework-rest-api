const Joi = require("joi");

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

exports.updateContactDataValidator = (data) =>
  Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  }).validate(data);
