"use strict";
module.exports = (sequelize, DataTypes) => {
  const skill = sequelize.define(
    "skill",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
      },
      teacherId: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "teacherId"
      },
      costPerHour: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "costPerHour"
      },
      skillTagId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "skillTagId"
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "note"
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

    skill.associate = function(models) {
      skill.belongsTo(models.skill_tag, {
        foreignKey: "skillTagId",
        targetKey: "id"
      });
      
      skill.belongsTo(models.account, {
        foreignKey: "teacherId",
        targetKey: "username"
      });
    };
  return skill;
};
