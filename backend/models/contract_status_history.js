"use strict";
module.exports = (sequelize, DataTypes) => {
  const contractStatusHistory = sequelize.define(
    "contract_status_history",
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

      date: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "date"
      },
      status: {
        type: DataTypes.STRING(45),
        allowNull: false,
        field: "status"
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  contractStatusHistory.associate = function(models) {
    // message.belongsTo(models.contract, {
    //   foreignKey: "contractId",
    //   targetKey: "id"
    // });
    //   message.hasMany(models.tracking_event, {
    //     foreignKey: "commentNo",
    //     sourceKey: "commentNo"
    //   });
  };
  return contractStatusHistory;
};
