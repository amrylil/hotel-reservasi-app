// src/dtos/auth.dto.js

const { z } = require('zod');

const registerSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }).min(3, 'Name must be at least 3 characters long'),
    
    email: z.string({
      required_error: 'Email is required',
    }).email('Not a valid email'),

    password: z.string({
      required_error: 'Password is required',
    }).min(6, 'Password must be at least 6 characters long'),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }).email('Not a valid email'),

    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err) {
    return res.status(400).send(err.errors);
  }
};


module.exports = {
  registerSchema,
  loginSchema,
  validate,
};