const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Category extends Model {}

Category.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Set as primary key
      autoIncrement: true, // Enable auto-increment
      allowNull: false,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false, // Disable timestamps
    freezeTableName: true, // Prevent table name pluralization
    underscored: true, // Use underscored naming convention
    modelName: "category", // Model name
  }
);

module.exports = Category;
