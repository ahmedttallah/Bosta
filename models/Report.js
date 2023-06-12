// Report model
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Report = sequelize.define("Report", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availability: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    outages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    downtime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uptime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    responseTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    history: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });

  Report.associate = (models) => {
    Report.belongsTo(models.URLCheck);
  };

  return Report;
};
