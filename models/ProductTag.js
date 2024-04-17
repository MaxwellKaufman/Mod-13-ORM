const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
      },
      allowNull: false, // Add allowNull property
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id",
      },
      allowNull: false, // Add allowNull property
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
