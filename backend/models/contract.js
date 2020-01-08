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
        allowNull: true,
        field: "totalHours"
      },
      createDt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "createDt"
      },
      startDt: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "startDt"
      },
      etaDt: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "etaDt"
      },
      toDt: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "toDt"
      },
      detail: {
        type: DataTypes.TEXT,
        allowNull: true,
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
        field: "rate",
        defaultValue: -1
      },
      studentComment: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
        field: "studentComment"
      },
      complainDetail: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
        field: "complainDetail"
      },
      costPerHour: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "costPerHour"
      },
      resolveDetail: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
        field: "resolveDetail"
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
    contract.hasOne(models.skill, {
      as: "skill",
      foreignKey: "id",
      sourceKey: "skillId"
    });
    // contract.hasMany(models.tracking_event, {
    //   foreignKey: "commentNo",
    //   sourceKey: "commentNo"
    // });
  };
  return contract;
};
