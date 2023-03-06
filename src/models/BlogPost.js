/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost',
  {
    id: {
      allowNull: false, 
      autoIncrement: true, 
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false, tableName: 'blog_posts', underscored: true });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, 
      { foreignKey: 'userId', as: 'BlogPostUser' });
  };

  return blogPost;
}