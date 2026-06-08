const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const alphaErr = "must only contain letters";
const categoryNameErr = "must be between 1 and 50 characters";
const desclengthErr = "must be between 20 and 500 characters";
const emptyErr = "is required";

const validateCategory = [
    body("categoryName").trim()
    .isAlpha().withMessage(`Category Name ${alphaErr}`)
    .notEmpty().withMessage(`Category Name ${emptyErr}`)
    .isLength({ min: 1, max: 50}).withMessage(`Category Name ${categoryNameErr}`)
    .escape(),

    body("categoryDesc").trim()
    .isLength({ min: 20, max: 500 }).withMessage(`Category Description ${desclengthErr}`)
    .escape()
]

exports.categoriesListGet = async (req, res, next) => {
    try {
        const categories = await db.getAllCategories();
        
        const countPromises = categories.map((category) => {
            return db.getProductCountByCategory(category.category_id);
        });
        const counts = await Promise.all(countPromises);
        res.render("categories", {
            title: "Categories", 
            categories, 
            activePage: "categories",
            counts
        })
    } catch (err) {
        next(err)
    }
    
}

exports.newCategoryGet = async (req, res, next) => {
    try {
        res.render("categoryForm", {title: "New Category Form", activePage: "" });
    } catch (err) {
        next(err)
    }
}

exports.newCategoryPost = [
    validateCategory,
    async (req, res, next) => {
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()) {
            return res.status(400).render("categoryForm", {
                title: "New Category Form",
                errors: validationErrors.array(),
                activePage: ""
            });
        } else {
            try {
                const { categoryName, categoryDesc }= req.body;
                await db.insertCategory(categoryName, categoryDesc);
                res.redirect("/categories");
            } catch (err) {
                next(err);
            }
        }
    }
]

exports.deleteCategoryPost = async (req, res, next) => {
    try {
        const { category_id } = req.params;
        const productCount = await db.getProductCountByCategory(category_id);
        if (productCount > 0) {
            const categories = await db.getAllCategories();
            const countPromises = categories.map((category) => {
                return db.getProductCountByCategory(category.category_id);
            });
            const counts = await Promise.all(countPromises);

            return res.status(400).render("categories", {
                title: "Categories",
                categories,
                error: "Cannot delete a category that still has products in it",
                activePage: "categories",
                counts
            });
        }
        await db.deleteCategory(category_id);
        res.redirect("/categories");
    } catch (err) {
        next (err);
    }
}