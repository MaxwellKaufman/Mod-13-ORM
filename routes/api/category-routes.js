const router = require("express").Router();
const { Category, Product } = require("../../models");

// Function to handle error responses
const handleResponse = (res, err) => {
  console.error(err);
  res.status(500).json(err);
};

// GET all categories with associated products
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({ include: [Product] });
    res.json(categories);
  } catch (err) {
    handleResponse(res, err);
  }
});

// GET a single category by ID with associated products
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.json(category);
  } catch (err) {
    handleResponse(res, err);
  }
});

// POST a new category
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.json(newCategory);
  } catch (err) {
    handleResponse(res, err);
  }
});

// PUT update a category by ID
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    const originalData = category.get({ plain: true });

    await Category.update(req.body, { where: { id: req.params.id } });
    const updatedCategory = await Category.findByPk(req.params.id);

    res.json({
      original: originalData,
      message: "Category successfully updated",
      updated: updatedCategory.get({ plain: true }),
    });
  } catch (err) {
    handleResponse(res, err);
  }
});

// DELETE a category by ID
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    await Category.destroy({ where: { id: req.params.id } });

    res.json({
      message: "Category successfully deleted",
      original: category.get({ plain: true }),
    });
  } catch (err) {
    handleResponse(res, err);
  }
});

module.exports = router;
