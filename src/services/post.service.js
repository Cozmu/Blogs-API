const { BlogPost, PostCategory, Category, User, sequelize } = require('../models');

const createNewBlogPost = async (title, content, id, categoryIds) => {
  const result = await sequelize.transaction(async (t) => {
    const newBlogPost = await BlogPost.create({
      title, content, userId: id, published: Date.now(), updated: Date.now(),
    }, { transaction: t });

    await Promise
    .all(categoryIds.map((categoryId) => PostCategory.create({ 
      postId: newBlogPost.id, 
      categoryId, 
    }, { transaction: t })));

    return newBlogPost;
  });

  return result;
};

const getAllBlogPosts = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],    
  });

  return result;
}; 

module.exports = {
  getAllBlogPosts,
  createNewBlogPost,
};