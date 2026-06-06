const { Router } = require("express");
const categoryController = require("../controllers/categoryController");

const categoryRouter = Router();

categoryRouter.get("/", categoryController.categoriesListGet);
categoryRouter.get("/form", categoryController.newCategoryGet);
categoryRouter.post("/", categoryController.newCategoryPost);

module.exports = categoryRouter