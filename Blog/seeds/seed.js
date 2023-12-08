const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
const { writeFileSync } = require("fs")
const { faker } = require('@faker-js/faker');
const path = require("path")

const RANDOMUSERS = [];

function createRandomUser() {
    return {

        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}

Array.from({ length: 10 }).forEach(() => {
    RANDOMUSERS.push(createRandomUser());
});

console.log(RANDOMUSERS)

/////////////////////  USE NEW postdata.json /////////////////////

const POSTS = [];

function createRandomBlogs() {
    return {
        title: faker.lorem.words(Math.ceil(Math.random() * 5)),
        contentPost: faker.lorem.paragraphs(Math.ceil(Math.random() * 4)),
        dateCreated: faker.date.between('2020-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
        user_id: Math.ceil(Math.random() * RANDOMUSERS.length)
    };
}

Array.from({ length: 15 }).forEach(() => {
    POSTS.push(createRandomBlogs());
});

console.log(POSTS)

const COMMENTS = [];

function createRandomComment() {
    return {
        commentPost: faker.lorem.paragraphs(1),
        dateCreated: faker.date.between('2020-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
        user_id: Math.ceil(Math.random() * RANDOMUSERS.length),
        blog_id: Math.ceil(Math.random() * POSTS.length)
    };
}

Array.from({ length: 25 }).forEach(() => {
    COMMENTS.push(createRandomComment());
});

console.log(COMMENTS)

writeFileSync(path.join(process.cwd(), "seeds", "blogData.json"), JSON.stringify(POSTS, null, 2))
writeFileSync(path.join(process.cwd(), "seeds", "userData.json"), JSON.stringify(RANDOMUSERS, null, 2))
writeFileSync(path.join(process.cwd(), "seeds", "commentData.json"), JSON.stringify(COMMENTS, null, 2))

const userData = require("./userData.json");
const blogData = require("./blogData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Blog.bulkCreate(blogData);
    await Comment.bulkCreate(commentData);

    console.log(" 🌱🌱🌱🌱🌱🌱🌱🌱 SEEDING DONE! 🌱🌱🌱🌱🌱🌱🌱🌱🌱");

    process.exit(0);
};

seedDatabase();
