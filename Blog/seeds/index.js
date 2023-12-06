const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
// const seedUser = require('./userData.json');
const blogData = require('./blogData.json');
// const commentData = require("./commentData.json");

const seedAll = async () => {
    await sequelize.sync({ force: true });

    for (const blog of blogData) {
        await Blog.create({
            ...blog,
        });
    }
    process.exit(0);
};

seedAll();
