/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', 
  {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      allowNull: false, 
      autoIncrement: true, 
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false, tableName: 'users', underscored: true });

  return user;
};