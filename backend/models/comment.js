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
      contractId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "contractId"
      },
      comment: {
        type: DataTypes.JSON,
        allowNull: false,
        field: "comment"
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  comment.associate = function(models) {
    comment.belongsTo(models.contract, {
      foreignKey: "contractId",
      targetKey: "id"
    });

    //   comment.hasMany(models.tracking_event, {
    //     foreignKey: "commentNo",
    //     sourceKey: "commentNo"
    //   });
  };
  return comment;
};
