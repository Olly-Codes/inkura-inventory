const db = require("../db/queries");

exports.categoriesListGet = async (req, res, next) => {
    try {
        const categories = await db.getAllCategories();
        res.render("categories", {title: "Categories", categories })
    } catch (err) {
        next(err)
    }
    
}

exports.newCategoryGet = async (req, res, next) => {
    try {
        res.render("categoryForm", {title: "Category Form" });
    } catch (err) {
        next(err)
    }
}

exports.newCategoryPost = async (req, res, next) => {
    try {
        console.log(req.body);
        const { categoryName, categoryDesc }= req.body;

        console.log(categoryName, categoryDesc);
        res.redirect("/categories");
    } catch (err) {
        next(err)
    }
}