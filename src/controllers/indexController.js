const db = require("../config/db/queries");
const { formattedTitle } = require("../utils/titleFormatter");

exports.productsListGet = async (req, res, next) => {
    try {
        const products = await db.getAllProducts();
        const formattedProducts = products.map((product) => {
            return {
                ...product,
                product_name: formattedTitle(product.product_name)
            }
        });
        console.log(formattedTitles);
        res.render("index", {title: "Home", products: formattedProducts, activePage: "home" })
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
        const dbCategories = await db.getAllCategories();
        const formattedProducts = products.map((product) => {
            return {
                ...product,
                formatted_product_name: formattedTitle(product.product_name)
            }
        });
        res.render("index", { 
            title: "Home", 
            products: formattedProducts, 
            query: req.query,
            allCategories: dbCategories,
            activePage: "home"
         });
    } catch (err) {
        next(err);
    }
};