"use strict";
module.exports = (sequelize, DataTypes) => {
  const contractProgress = sequelize.define(
    "contract_progress",
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
      hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "hours"
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  contractProgress.associate = function(models) {
    // message.belongsTo(models.contract, {
    //   foreignKey: "contractId",
    //   targetKey: "id"
    // });
    //   message.hasMany(models.tracking_event, {
    //     foreignKey: "commentNo",
    //     sourceKey: "commentNo"
    //   });
  };
  return contractProgress;
};
