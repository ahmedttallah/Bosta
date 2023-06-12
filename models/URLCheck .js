// URLCheck model
const { DataTypes } = require("sequelize");

const URLCheck = sequelize.define("URLCheck", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  protocol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  port: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  webhook: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timeout: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 5,
  },
  interval: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 600,
  },
  threshold: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
  },
  authenticationUsername: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  authenticationPassword: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ignoreSSL: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
});

URLCheck.associate = (models) => {
  URLCheck.belongsToMany(models.Tag, { through: "URLCheckTag" });
  URLCheck.belongsTo(models.User);
  URLCheck.hasMany(models.Report);
};

module.exports = URLCheck;
