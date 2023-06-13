// URLCheckTag model
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const URLCheckTag = sequelize.define("URLCheckTag", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    URLCheckId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return URLCheckTag;
};
