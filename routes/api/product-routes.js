const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// Function to handle error responses
const handleResponse = (res, err) => {
  console.error(err);
  res.status(500).json(err);
};

// GET all products with associated Category and Tag data
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category },
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    });
    res.json(products);
  } catch (err) {
    handleResponse(res, err);
  }
});

// GET a single product by ID with associated Category and Tag data
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (err) {
    handleResponse(res, err);
  }
});

// POST a new product
router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: newProduct.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(newProduct);
  } catch (err) {
    handleResponse(res, err);
  }
});

// PUT update a product by ID
router.put("/:id", async (req, res) => {
  try {
    const [rowsAffected] = await Product.update(req.body, {
      where: { id: req.params.id },
    });

    if (rowsAffected === 0) {
      res
        .status(404)
        .json({ message: "Product not found or no changes detected" });
      return;
    }

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });

      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => ({ product_id: req.params.id, tag_id }));

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    handleResponse(res, err);
  }
});

// DELETE a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const rowsDeleted = await Product.destroy({ where: { id: req.params.id } });

    if (rowsDeleted === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    handleResponse(res, err);
  }
});

module.exports = router;
