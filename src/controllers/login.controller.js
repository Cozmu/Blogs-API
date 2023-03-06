const { loginService } = require('../services');
const { createToken } = require('../auth/autbFunctions');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' }); 
  }
  const checkFields = await loginService.checkUser(email, password);
  if (checkFields.length === 0) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  const token = createToken({ email, id: checkFields[0].id });

  return res.status(200).json({ token });
};

module.exports = {
  login,
};