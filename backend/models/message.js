"use strict";
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define(
    "message",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
      },
      contractId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "contractId"
      },
      message: {
        type: DataTypes.JSON,
        allowNull: false,
        field: "message"
      },
      createDt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "createDt"
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  message.associate = function(models) {
    message.belongsTo(models.contract, {
      foreignKey: "contractId",
      targetKey: "id"
    });

    //   message.hasMany(models.tracking_event, {
    //     foreignKey: "commentNo",
    //     sourceKey: "commentNo"
    //   });
  };
  return message;
};
