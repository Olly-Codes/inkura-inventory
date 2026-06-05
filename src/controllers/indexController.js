const db = require("../db/queries");

exports.productsListGet = async (req, res, next) => {
    try {
        const products = await db.getAllProducts();
        res.render("index", {title: "Home", products})
    } catch (err) {
        next(err)
    }
    
}

exports.productsFiltertGet = async (req, res, next) => {
    try {
        let categories = req.query.category;
        if (categories && !Array.isArray(categories)) categories = [categories];

        const filters = {
            categories,
            sortOrder: req.query.sortOrder,
            maxPrice: req.query.maxPrice
        };

        const products = await db.getFilteredProducts(filters);
        res.render("index", { title: "Home", products, query: req.query });
    } catch (err) {
        next(err);
    }
};