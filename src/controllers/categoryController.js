const db = require("../db/queries");

exports.categoriesListGet = async (req, res, next) => {
    try {
        const categories = await db.getAllCategories();
        res.render("categories", {title: "Categories", categories })
    } catch (err) {
        next(err)
    }
    
}