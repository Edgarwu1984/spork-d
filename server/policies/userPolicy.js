const Joi = require('joi');
const ApiError = require('../utils/ApiError');

const userValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{6,12}$')),
    photo: Joi.string(),
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

module.exports = userValidation;
