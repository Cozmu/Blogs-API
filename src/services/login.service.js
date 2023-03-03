const { User } = require('../models');

const checkUser = async (email, password) => {
  const result = await User.findAll({
    where: { email, password },
  });
  return result;
};

module.exports = {
  checkUser,
};