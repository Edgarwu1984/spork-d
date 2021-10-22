const Joi = require('joi');
const ApiError = require('../utils/ApiError');

const registerValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{6,12}$')),
    photo: Joi.string(),
    isAdmin: Joi.boolean(),
    isActivated: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorKey = error.details[0].context.key;
    if (errorKey === 'username') {
      return next(ApiError.notAuthRequest('You must provided a username.'));
    } else if (errorKey === 'email') {
      return next(
        ApiError.notAuthRequest('You must provided a valid email address.')
      );
    } else if (errorKey === 'password') {
      return next(
        ApiError.notAuthRequest(
          'The password failed to match the requirements: 1. It must contain ONLY the following characters: lowercase, uppercase, numbers; 2. Must be between 6 and 12 characters'
        )
      );
    } else {
      return next(ApiError.notAuthRequest('Invalid information provided.'));
    }
  } else {
    next();
  }
};

const loginValidation = (req, res, next) => {
  // Create Schema
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  // Use Joi schema
  const { error } = schema.validate(req.body);

  if (error) {
    const errorKey = error.details[0].context.key;
    if (errorKey === 'email') {
      return next(
        ApiError.notAuthRequest('You must provided a valid email address.')
      );
    } else if (errorKey === 'password') {
      return next(ApiError.notAuthRequest('You have to provide password.'));
    } else {
      return next(ApiError.notAuthRequest('Invalid information provided.'));
    }
  } else {
    next();
  }
};

module.exports = { registerValidation, loginValidation };
