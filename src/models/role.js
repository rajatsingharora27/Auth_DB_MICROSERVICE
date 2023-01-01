"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      role.belongsToMany(models.User, { through: "User_Role" });
    }
  }
  role.init(
    {
      role: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "role",
    }
  );
  return role;
};
