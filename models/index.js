// Import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Define associations
// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id", // Define foreign key
  onDelete: "CASCADE", // Set onDelete behavior
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id", // Define foreign key
  onDelete: "CASCADE", // Set onDelete behavior
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id", // Define foreign key
  onDelete: "CASCADE", // Set onDelete behavior
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id", // Define foreign key
  onDelete: "CASCADE", // Set onDelete behavior
});

// Export models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
