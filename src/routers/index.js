const loginRouter = require('./login.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const postRouter = require('./post.router');

module.exports = {
    postRouter,
    categoryRouter,
    userRouter,
    loginRouter,
};