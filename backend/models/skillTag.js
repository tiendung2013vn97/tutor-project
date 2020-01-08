"use strict";
module.exports = (sequelize, DataTypes) => {
  const skillTag = sequelize.define(
    "skill_tag",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: "name"
      },
      numUsed: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: "numUsed"
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

  skillTag.associate = function(models) {
    // skillTag.belongsTo(models.comment_status, {
    //     foreignKey: "statusId",
    //     targetKey: "wsId"
    //   });

    skillTag.hasMany(models.skill, {
      foreignKey: "skillTagId",
      sourceKey: "id"
    });
  };
  return skillTag;
};
