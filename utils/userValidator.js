const Joi = require("joi");
const PASSWD_REGEX = require("../constants/passwordRegex");
const userSubscriptionEnum = require("../constants/userSubscriptionEnum");

exports.createUserDataValidator = (data) =>
  Joi.object({
    password: Joi.string().regex(PASSWD_REGEX).required().messages({
      "any.required": `missing required "password" field`,
      "string.pattern.base": `Password must contain uppercase and lowercase letters, numbers and symbols`,
    }),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid(...Object.values(userSubscriptionEnum)),
  }).validate(data);

exports.updateUserDataValidator = (data) =>
  Joi.object({
    password: Joi.string().pattern(PASSWD_REGEX).messages({
      "string.pattern.base": `Password must contain uppercase and lowercase letters, numbers and symbols`,
    }),
    email: Joi.string().email(),
    subscription: Joi.string().valid(...Object.values(userSubscriptionEnum)),
  }).validate(data);

exports.signUpUserDataValidator = (data) =>
  Joi.object({
    password: Joi.string()
      .pattern(PASSWD_REGEX)
      .required()
      .message({ "any.required": `missing required "password" field` }),
    email: Joi.string().email().required().messages({
      "any.required": `missing required "email" field`,
    }),
  }).validate(data);

  exports.loginUserDataValidator = (data) =>
  Joi.object({
    password: Joi.string().pattern(PASSWD_REGEX).messages({
      "string.pattern.base": `Password must contain uppercase and lowercase letters, numbers and symbols`,
    }),
    email: Joi.string().email().messages({
      "string.email": `Email is wrong`,
    }),
  }).validate(data);

