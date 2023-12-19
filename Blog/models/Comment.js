const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Blog = require('./Blog');

class Comment extends Model { }

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    blog_id: {
        type: DataTypes.INTEGER,
        references: {
            Model: 'Blog', 
            key: 'id',
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            Model: 'User', 
            key: 'id',
        }
    },
    commentPost: {
        type: DataTypes.TEXT, 
        allowNull: false
    },
    dateCreated: {
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize
})

module.exports = Comment