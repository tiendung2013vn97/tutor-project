"use strict";
module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define(
    "session",
    {
      accountId: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
        field: "accountId"
      },
      token: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: "token"
      },
      loginDt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "loginDt"
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
  return session;
};
