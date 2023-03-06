const { userService } = require('../services');
const { createToken } = require('../auth/autbFunctions');

const newUser = async (req, res) => {
  const result = await userService.createNewUser(req.body);
  const token = createToken({ email: result.email, id: result.id });
  return res.status(201).json({ token });
};

const listUsers = async (req, res) => {
  const result = await userService.getAllUser();
  return res.status(200).json(result);
};

const listUserById = async (req, res) => {
  const { id } = req.params;
  const result = await userService.getUserById(id);
  if (!result) return res.status(404).json({ message: 'User does not exist' });
  res.status(200).json(result);
};

module.exports = {
  newUser,
  listUserById,
  listUsers,
};