"use strict";
module.exports = (sequelize, DataTypes) => {
  const contract = sequelize.define(
    "contract",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
      },
      skillId: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "skillId"
      },
      studentId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "studentId"
      },
      totalHours: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "totalHours"
      },
      createDt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "createDt"
      },
      toDt: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "toDt"
      },
      detail: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "detail"
      },

      status: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "status"
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "rate"
      },
      studentComment: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
        field: "studentComment"
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

  contract.associate = function(models) {
    // contract.hasMany(models.comment, {
    //   foreignKey: "statusId",
    //   sourceKey: "wsId"
    // });
    // contract.hasMany(models.tracking_event, {
    //   foreignKey: "commentNo",
    //   sourceKey: "commentNo"
    // });
  };
  return contract;
};