const { userService } = require('../services');
const { createToken } = require('../auth/autbFunctions');

const newUser = async (req, res) => {
  const result = await userService.createNewUser(req.body);
  const requestIdNewUser = await userService.checkEmailUser(result.email);
  const token = createToken({ email: result.email, id: requestIdNewUser[0].id });
  return res.status(201).json({ token });
};

module.exports = {
  newUser,
};