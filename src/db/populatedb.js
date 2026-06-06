const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_name VARCHAR(255) NOT NULL,
    category_description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS authors (
    author_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    author_name VARCHAR(255) NOT NULL,
    author_surname VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT NOT NULL,
    product_quantity INTEGER NOT NULL,
    product_price DECIMAL NOT NULL,
    product_image_url TEXT,
    category_id INTEGER,
    author_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories (category_id),
    FOREIGN KEY (author_id) REFERENCES authors (author_id)
);

INSERT INTO categories (category_name, category_description)
VALUES
    ('Kodomo', 'Manga aimed at children'),
    ('Shonen', 'Manga aimed at adolescent boys'),
    ('Shojo', 'Manga aimed at adolescent girls'),
    ('Seinen', 'Manga aimed at adult men'),
    ('Josei', 'Manga aimed at adult woman');

INSERT INTO authors (author_name, author_surname)
VALUES
    ('Masashi', 'Kishimoto'),
    ('Kentarou', 'Miura'),
    ('Takehiko', 'Inoue'),
    ('Eiichiro', 'Oda'),
    ('Izumi', 'Todo'),
    ('Naoko', 'Takeuchi'),
    ('Akiko', 'Higashimura');  

INSERT INTO products (product_name, product_description, product_quantity, product_price, product_image_url, category_id, author_id)
VALUES
    ('naruto', 'An orphaned ninja with a sealed demon fox fights for acceptance and strives to become the ultimate village leader.', 7, 435.00, '/images/naruto.jpg', 2, 1),
    ('berserk', 'A lone mercenary wields a massive sword against demons and a tragic destiny in a dark, brutal fantasy world.', 25, 375.00, '/images/berserk.jpg', 4, 2),
    ('vagabond', 'A wandering swordsman battles ruthelss rivals and internal demonds on a brutal path to becoming a samurai legend.', 75,500.00, '/images/vagabond.jpg', 4, 3),
    ('one-piece', 'A rubber powered pirate captain and his loyal crew sail treacherous seas to find the ultimate world treasure', 60, 623.00, '/images/one-piece.jpg', 2, 4),
    ('pretty-cure', 'Ordinary schoolgirls transform into legendary magical warriors to protect the universe from evil dark forces.', 5, 150.00, '/images/pretty-cure.jpg', 1, 5),
    ('sailor-moon', 'A clumsy schoolgirl awakens as a magical guardian to lead a team of heroins against cosmic evil forces', 45, 302.00, '/images/sailor-moon.jpg', 3, 6),
    ('princess-jellyfish', 'An introverted jellyfish-obsessed girl finds her life upended when a stylsh, cross-dressing fashinista enters her nerdy communal home.', 105, 922.00, '/images/princess-jellyfish.jpg', 5, 7);   

`;

(async () => {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DATABASE_URI,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
})();