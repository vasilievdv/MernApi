const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .required()
      .messages({
        'string.base': '"a" should be a type of \'text\'',
        'string.empty': '"a" cannot be an empty field',
        'string.min': '"Name" должно состоять минимум из {#limit}-х символов',
        'any.required': '"Name" обязательное поле',
      }),
    email: Joi.string()
      .required()
      .email()
      .messages({
        'string.empty': '"Email" не может быть пустым',
        'any.required': '"Email" обязательное поле',
      }),
    password: Joi.string()
      .min(6)
      .required(),
    birthdate: Joi.string()
      .required(),
    sex: Joi.string()
      .required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
