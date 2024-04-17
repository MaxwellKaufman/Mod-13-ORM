const router = require("express").Router();
const { Tag, Product } = require("../../models");

// Function to handle error responses
const handleResponse = (res, err) => {
  console.error(err);
  res.status(500).json(err);
};

// GET all tags with associated product data
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({ include: [Product] });
    res.json(tags);
  } catch (err) {
    handleResponse(res, err);
  }
});

// GET a single tag by ID with associated product data
router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, { include: [Product] });
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.json(tag);
  } catch (err) {
    handleResponse(res, err);
  }
});

// POST a new tag
router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(newTag);
  } catch (err) {
    handleResponse(res, err);
  }
});

// PUT update a tag's name by ID
router.put("/:id", async (req, res) => {
  try {
    const [affectedRows] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: "Tag not found or no changes detected" });
      return;
    }
    res.json({ message: "Tag updated successfully" });
  } catch (err) {
    handleResponse(res, err);
  }
});

// DELETE a tag by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRows = await Tag.destroy({ where: { id: req.params.id } });
    if (deletedRows === 0) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.json({ message: "Tag deleted successfully" });
  } catch (err) {
    handleResponse(res, err);
  }
});

module.exports = router;
