"use strict";
module.exports = (sequelize, DataTypes) => {
  const account = sequelize.define(
    "account",
    {
      username: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
        field: "username"
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: "password"
      },
      fullname: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "fullname"
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "email"
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "age"
      },
      gender: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "gender"
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "locationId"
      },
      image: {
        type: DataTypes.STRING(45),
        allowNull: true,
        defaultValue: "defaultUser.png",
        field: "image"
      },
      intro: {
        type: DataTypes.TEXT,
        defaultValue: "",
        allowNull: true,
        field: "intro"
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: -1,
        field: "rate"
      },
      type: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "type"
      },
      money: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "money"
      },
      isActived: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
        field: "isActived"
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  account.associate = function(models) {
    account.belongsTo(models.location, {
      foreignKey: "locationId",
      targetKey: "id"
    });

    account.hasMany(models.skill, {
      foreignKey: "teacherId",
      sourceKey: "username"
    });
  };
  return account;
};
