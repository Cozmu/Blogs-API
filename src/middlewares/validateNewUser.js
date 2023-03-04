const { userService } = require('../services');
 
const validateNewUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i; // fonte: https://www.regular-expressions.info/email.html
  const check = await userService.checkEmailUser(email);
  if (displayName.length < 8) {
    return res.status(400).json({ 
      message: '"displayName" length must be at least 8 characters long', 
    }); 
  }
  if (!email.match(regex)) {
    return res.status(400).json({ message: '"email" must be a valid email' }); 
  }
  if (password.length < 6) {
    return res.status(400).json({ 
      message: '"password" length must be at least 6 characters long', 
    }); 
  }
  if (check.length > 0) return res.status(409).json({ message: 'User already registered' });
  return next();
};

module.exports = validateNewUser;
// if (check[0]?.email === email) return res.status(409).json({ message: 'User already registered' });
