const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init({
    commentPost: {
        type: DataTypes.TEXT, allowNull: false
    },
    dateCreated: {
        type: DataTypes.DATE, defaultValue: DataTypes.NOW
    }
}, {
    sequelize
})

module.exports = Comment