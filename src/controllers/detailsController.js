const db = require("../db/queries");
const { formattedTitle } = require("../utils/titleFormatter");

exports.productGet = async (req, res, next) => {
    try {
        const { product_id, product_name } = req.params;
        const product = await db.getProduct(product_id);
        const formattedProduct = {
            ...product,
            product_name: formattedTitle(product.product_name)
        }

        if (!product) {
            const error = new Error("The product you are looking for does not exist");
            error.statusCode = 404;
            throw error;
        }

        res.render("details", { title: "Details", product: formattedProduct});
    } catch (err) {
        next(err)
    }
}