const pool = require("./pool");

const getAllProducts = async () => {
    const { rows } = await pool.query(`
            SELECT * FROM
            products p JOIN categories c
            ON p.category_id = c.category_id
            JOIN authors a
            ON p.author_id = a.author_id;
        `
    );
    return rows;
}

const getProduct = async (product_id) => {
    const { rows } = await pool.query(`
            SELECT * FROM
            products p JOIN categories c
            ON p.category_id = c.category_id
            JOIN authors a
            ON p.author_id = a.author_id
            WHERE p.product_id = $1;
        `, [product_id]
    );
    return rows[0]
}

module.exports = {
    getAllProducts,
    getProduct
}
