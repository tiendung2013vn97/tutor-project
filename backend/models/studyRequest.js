"use strict";
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    "comment",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
      },
      studentId: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "studentId"
      },
      teacherId: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "teacherId"
      },
      skillId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "skillId"
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
        field: "note"
      },
      createDt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "createDt"
      },
      status: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "status"
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

  //   comment.associate = function(models) {
  //     comment.belongsTo(models.comment_status, {
  //       foreignKey: "statusId",
  //       targetKey: "wsId"
  //     });
  //     comment.hasMany(models.tracking_event, {
  //       foreignKey: "commentNo",
  //       sourceKey: "commentNo"
  //     });
  //   };
  return comment;
};
