const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// getting all tags including associated Product data
router.get("/", async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// getting a single tag by its `id` including associated Product data
router.get("/:id", async (req, res) => {
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagsData) {
      res.status(404).json({ message: "No tag found with that id" });
      return;
    }

    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});
 // creating a new tag
router.post("/", async (req, res) => {
  try {
    const tagsData = await Tag.create(req.body);
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try{
    const oldTagData = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (!oldTagData) {
    res.status(404).json({ message: "No categorie found with that id" });
    return;
  }
  res.status(200).json(oldTagData);
} catch (err) {
  res.status(500).json(err);
}
});
// deleting a tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const tagsData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagsData) {
      res.status(404).json({ message: "No tag found with that id" });
      return;
    }
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
