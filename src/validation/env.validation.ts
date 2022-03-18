import * as Joi from 'joi';

const nodeEnvValues = ['development', 'production', 'test', 'provision'];

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...nodeEnvValues)
    .default(nodeEnvValues[0]),
  MONGODB_CONNECTION_STRING: Joi.string().required(),
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().min(32).required(),
});

export const validationOptions = {
  allowUnknown: true,
  abortEarly: true,
};
