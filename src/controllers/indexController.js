const db = require("../db/queries");

exports.productsListGet = async (req, res, next) => {
    try {
        const products = await db.getAllProducts();
        res.render("index", {title: "Home", products})
    } catch (err) {
        next(err)
    }
    
}