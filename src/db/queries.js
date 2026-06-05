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

const getFilteredProducts = async ({ categories, sortOrder, maxPrice }) => {
    let query = `
        SELECT * FROM products p
        JOIN categories c ON p.category_id = c.category_id
        JOIN authors a ON p.author_id = a.author_id
    `;
    const values = [];

    if (categories && categories.length > 0) {
        const placeholders = categories.map((_, index) => `$${index + 1}`).join(", ");
        query += ` WHERE c.category_name IN (${placeholders})`;
        values.push(...categories);
    }

    if (maxPrice) {
        query += values.length > 0 ? ` AND` : ` WHERE`;
        values.push(maxPrice);
        query += ` p.product_price <= $${values.length}`;
    }

    const order = sortOrder === "desc" ? "DESC" : "ASC";
    query += ` ORDER BY p.product_price ${order}`;

    const { rows } = await pool.query(query, values);
    return rows;
};

module.exports = {
    getAllProducts,
    getProduct,
    getFilteredProducts
}
