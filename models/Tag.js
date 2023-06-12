// Tag model
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Tag = sequelize.define("Tag", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Define the many-to-many relationship between URLCheck and Tag
  Tag.associate = (models) => {
    Tag.belongsToMany(models.URLCheck, { through: "URLCheckTag" });
  };

  return Tag;
};
