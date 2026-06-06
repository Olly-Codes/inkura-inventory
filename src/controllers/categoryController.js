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
        res.render("categories", {title: "Categories", categories })
    } catch (err) {
        next(err)
    }
    
}

exports.newCategoryGet = async (req, res, next) => {
    try {
        res.render("categoryForm", {title: "New Category Form" });
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
            });
        } else {
            try {
                const { categoryName, categoryDesc }= req.body;
                console.log(categoryName, categoryDesc);
                res.redirect("/categories");
            } catch (err) {
                next(err);
            }
        }
    }
]