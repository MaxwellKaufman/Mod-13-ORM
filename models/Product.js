// Import necessary parts of the Sequelize library
const { Model, DataTypes } = require("sequelize");

// Import the database connection from config.js
const sequelize = require("../config/connection");

// Initialize the Product model by extending Sequelize's Model class
class Product extends Model {}

// Set up fields and rules for the Product model
Product.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10, // Set default value
      validate: {
        isNumeric: true,
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category", // Reference the Category model
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false, // Disable timestamps
    freezeTableName: true, // Prevent table name pluralization
    underscored: true, // Use underscored naming convention
    modelName: "product", // Model name
  }
);

module.exports = Product;
