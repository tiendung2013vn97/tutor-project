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
      studyRequestId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "studyRequestId"
      },
      skillId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "skillId"
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

  //   contract.associate = function(models) {
  //     contract.belongsTo(models.comment_status, {
  //       foreignKey: "statusId",
  //       targetKey: "wsId"
  //     });
  //     contract.hasMany(models.tracking_event, {
  //       foreignKey: "commentNo",
  //       sourceKey: "commentNo"
  //     });
  //   };
  return contract;
};
