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

const getAllUser = async () => {
    const result = await User.findAll({
        attributes: { exclude: 'password' },
    }); 
    return result;
};

const getUserById = async (id) => {
    const [result] = await User.findAll({
        where: { id },
        attributes: { exclude: 'password' },
    });
    return result;
};

const destroyUser = async (id) => {
    await User.destroy({ where: { id } });
};

module.exports = {
    getAllUser,
    destroyUser,
    getUserById,
    createNewUser,
    checkEmailUser,
};