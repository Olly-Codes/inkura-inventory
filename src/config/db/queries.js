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

const getAllCategories = async () => {
    const { rows } = await pool.query(`
            SELECT * FROM
            categories;
        `);
        return rows;
}

const insertCategory = async (category_name, category_description) => {
    await pool.query(`
        INSERT INTO categories (category_name, category_description)
        VALUES
            ($1, $2)
        `, [category_name, category_description]
    );
}

const getProductCountByCategory = async (category_id) => {
    const { rows } = await pool.query(`
        SELECT COUNT(*)
        FROM products
        WHERE category_id = $1;
        `, [category_id]
    );
    return parseInt(rows[0].count);
}

const deleteCategory = async (category_id) => {
    await pool.query(`
        DELETE FROM categories
        WHERE category_id = $1;
        `, [category_id]
    );
}

/* ----- AUTH */
const getUserByEmail = async (email) => {
    const { rows } = await pool.query(`
        SELECT * FROM users WHERE email = $1
        `, [email]
    );
    return rows[0]
}

const getUserById = async (id) => {
    const { rows } = await pool.query(`
        SELECT * FROM users WHERE id = $1`, [id]
    );
    return rows[0];
}

const insertUser = async (username, email, password) => {
    await pool.query(`
        INSERT INTO users (username, email, password)
        VALUES
            ($1, $2, $3)
        `, [username, email, password]
    );
}

module.exports = {
    getAllProducts,
    getProduct,
    getFilteredProducts,
    getAllCategories,
    insertCategory,
    getProductCountByCategory,
    deleteCategory,
    getUserByEmail,
    getUserById,
    insertUser
}
