const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// getting all categories including associated Products
router.get("/", async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// getting one category by its `id` value including associated Products
router.get("/:id", async (req, res) => {
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoriesData) {
      res.status(404).json({ message: "No categories found with that id" });
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// creating a new category
router.post("/", async (req, res) => {
  try {
    const categoriesData = await Category.create(req.body);
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// updating category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const oldCategorieData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!oldCategorieData) {
      res.status(404).json({ message: "No categorie found with that id" });
      return;
    }
    res.status(200).json(oldCategorieData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// deleting a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const categoriesData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoriesData) {
      res.status(404).json({ message: "No categorie found with that id" });
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
