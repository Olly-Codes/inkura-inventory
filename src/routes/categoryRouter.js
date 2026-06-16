const { Router } = require("express");
const { requireAdmin } = require("../config/middleware/auth");
const categoryController = require("../controllers/categoryController");

const categoryRouter = Router();

categoryRouter.get("/", requireAdmin, categoryController.categoriesListGet);

categoryRouter.get("/form", requireAdmin, categoryController.newCategoryGet);
categoryRouter.post("/", requireAdmin, categoryController.newCategoryPost);

categoryRouter.post("/delete/:category_id", requireAdmin, categoryController.deleteCategoryPost);

module.exports = categoryRouter