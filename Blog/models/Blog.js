const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init({
    title: {
        type: DataTypes.STRING, allowNull: false
    },
    contentPost: {
        type: DataTypes.TEXT, allowNull: false
    },
    dateCreated: {
        type: DataTypes.DATE, defaultValue: DataTypes.NOW
    }
}, {
    sequelize
})

module.exports = Blog