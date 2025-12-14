const Joi = require("joi");
const { failure } = require("../utils/response");


//Middleware to validate user data
const validateUser = (request, response, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
      }),
  }).options({ stripUnknown: true });

  const { error } = schema.validate(request.body);
  if (error) {
    return failure("BAD_REQUEST", {status: false, error: error.details[0].message}, response)
  }
  next();
};


// Middleware to validate book data
const validateBook = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": "Title is required",
        "any.required": "Title is required",
      }),
    author: Joi.string()
      .trim()
      .required()
      .messages({
        "string.empty": "Author is required",
        "any.required": "Author is required",
      }),
    available: Joi.boolean()
      .optional()
      .messages({
        "boolean.base": "Available must be true or false",
      }),
  }).options({ stripUnknown: true });

  const { error } = schema.validate(req.body, { abortEarly: true });

  if (error) {
    return failure("BAD_REQUEST", {status: false, error: error.details[0].message}, response)
  }
  next();
};


module.exports = {validateUser, validateBook};
