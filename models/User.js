// User model
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    hooks: {
      // Encrypt Password
      afterValidate: (user) => {
        if (user.dataValues.password) {
          user.dataValues.password = bcrypt.hashSync(
            user.dataValues.password,
            10
          );
        }
      },
    },
  }
);

User.associate = (models) => {
  User.hasMany(models.URLCheck);
};

module.exports = User;
