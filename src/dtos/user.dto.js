const { z } = require('zod');

const CreateUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'user']).default('user'),
});

class CreateUserDTO {
  constructor(data) {
    const parsed = CreateUserSchema.parse(data);
    this.name = parsed.name;
    this.email = parsed.email;
    this.password = parsed.password;
    this.role = parsed.role;
  }
}

const UpdateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email format').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  role: z.enum(['admin', 'user']).optional()
});

class UpdateUserDTO {
  constructor(data) {
    const parsed = UpdateUserSchema.parse(data);
    this.name = parsed.name;
    this.email = parsed.email;
    this.password = parsed.password;
    this.role = parsed.role;
  }
}

module.exports = {
  CreateUserDTO,UpdateUserDTO
};
