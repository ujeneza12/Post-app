const { DataTypes } = require("sequelize");
const db = require("../db");


// Define User model
const User = db.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
},
    {
        timestamps: false,
        tableName: "users",
      
  });

  
module.exports = User;