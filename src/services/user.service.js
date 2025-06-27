const User = require('../models/user.model');

const UserService = {
  async getAll() {
    return await User.find();
  },

  async getById(id) {
    return await User.findById(id);
  },

  async create(data) {
    const user = new User(data);
    return await user.save();
  },

  async update(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  },

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
};

module.exports = UserService;
