const { Router } = require("express");
const detailsController = require("../controllers/detailsController");

const detailsRouter = Router();

detailsRouter.get("/:product_id/:product_name", detailsController.productGet);

module.exports = detailsRouter