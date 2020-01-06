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

  //   message.associate = function(models) {
  //     message.belongsTo(models.comment_status, {
  //       foreignKey: "statusId",
  //       targetKey: "wsId"
  //     });
  //     message.hasMany(models.tracking_event, {
  //       foreignKey: "commentNo",
  //       sourceKey: "commentNo"
  //     });
  //   };
  return skillTag;
};
