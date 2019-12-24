"use strict";
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define(
    "location",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
      },
      city: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "city"
      },
      district: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "district"
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  location.associate = function(models) {
    location.hasMany(models.account, {
      foreignKey: "locationId",
      targetKey: "id"
    });
  };
  return location;
};
