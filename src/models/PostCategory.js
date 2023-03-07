/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory',
  {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, { underscored: true, timestamps: false, tableName: 'posts_categories' }); 
  
  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category,
      {
        foreignKey: 'categoryId',
        otherKey: 'postId',
        as: 'categories',
        through: postCategory,
    });

    models.Category.belongsToMany(models.BlogPost,
      {
        foreignKey: 'postId',
        otherKey: 'categoryId',
        as: 'blogPost',
        through: postCategory,
    });
  }

  return postCategory;
};