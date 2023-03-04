const { User } = require('../models');

const checkEmailUser = async (email) => {
    const result = await User.findAll({ 
        where: { email },
    });
    return result;
};

const createNewUser = async (body) => {
    const result = await User.create(body);
    return result; 
};

module.exports = {
    createNewUser,
    checkEmailUser,
};