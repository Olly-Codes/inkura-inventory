const db = require("../db/queries");

exports.productGet = async (req, res, next) => {
    try {
        const { product_id, product_name } = req.params;
        const product = await db.getProduct(product_id);

        if (!product) {
            const error = new Error("The product you are looking for does not exist");
            error.statusCode = 404;
            throw error;
        }

        res.render("details", { title: "Details", product});
    } catch (err) {
        next(err)
    }
}