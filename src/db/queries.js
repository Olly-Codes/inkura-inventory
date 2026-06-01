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

module.exports = {
    getAllProducts
}
