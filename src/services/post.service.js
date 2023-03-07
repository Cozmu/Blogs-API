const { Op } = require('sequelize');
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

const getBlogPostsById = async (id) => {
  const [result] = await BlogPost.findAll({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],    
  });

  return result;
};

const updateBlogPost = async (id, updateRequest) => {
  const [result] = await BlogPost.update(updateRequest, { where: { id } });
  return result;
};

const destroy = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

const getBlogPostBySearch = async (query) => {
  const searchByTitle = await BlogPost.findAll({ 
    where: { title: { [Op.like]: `%${query}%` } },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],  
  });
  if (searchByTitle.length === 0) {
    const searchByContent = await BlogPost.findAll({ 
      where: { content: { [Op.like]: `%${query}%` } },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ], 
    });
    return searchByContent;
  }
  return searchByTitle;
};

module.exports = {
  getBlogPostBySearch,
  updateBlogPost,
  destroy,
  getBlogPostsById,
  getAllBlogPosts,
  createNewBlogPost,
};