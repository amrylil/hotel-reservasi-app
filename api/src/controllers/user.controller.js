const { CreateUserDTO, UpdateUserDTO } = require('../dtos/user.dto');
const UserService = require('../services/user.service');
const { errorResponse, successResponse } = require('../utils/response');

const UserController = {
  async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const user = await UserService.getById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async create(req, res) {
  try {
    const dto = new CreateUserDTO(req.body);
    const user = await UserService.create(dto);
    res.status(201).json(successResponse(user, 'User created successfully'));
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json(errorResponse('Validation failed', err.errors));
    }
    res.status(500).json(errorResponse(err.message));
  }
},

  async update(req, res) {
  try {
    const dto = new UpdateUserDTO(req.body);
    const updatedUser = await UserService.update(req.params.id, dto);
    res.json(successResponse(updatedUser, 'User updated successfully'));
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json(errorResponse('Validation failed', err.errors));
    }
    res.status(400).json(errorResponse(err.message));
  }
},

  async delete(req, res) {
    try {
      await UserService.delete(req.params.id);
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = UserController;
