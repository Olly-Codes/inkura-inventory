const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexController.productsFiltertGet);

indexRouter.get("/about", (req, res) => res.render("about", {title: "About", activePage: "about" }));
indexRouter.get("/contact", (req, res) => res.render("contact", {title: "Contact", activePage: "contact" }));

module.exports = indexRouter