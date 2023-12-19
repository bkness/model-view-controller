const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            Model: 'User', 
            key: 'id',
        }
    },
    title: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    contentPost: {
        type: DataTypes.TEXT, 
        allowNull: false,
    },
    dateCreated: {
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW, // takes care of date created for you
    },
}, {
    sequelize
})

module.exports = Blog