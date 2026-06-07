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
    product_image_url TEXT NOT NULL,
    product_chapters INTEGER NOT NULL,
    product_volumes INTEGER NOT NULL,
    product_status VARCHAR(50) NOT NULL,
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

INSERT INTO products (product_name, product_description, product_quantity, product_price, product_image_url, product_chapters, product_volumes, product_status, category_id, author_id)
VALUES
    ('naruto', 'Before Naruto''s birth, a great demon fox had attacked the Hidden Leaf Village. A man known as the 4th Hokage sealed the demon inside the newly born Naruto, causing him to unknowingly grow up detested by his fellow villagers. Despite his lack of talent in many areas of ninjutsu, Naruto strives for only one goal: to gain the title of Hokage, the strongest ninja in his village. Desiring the respect he never received, Naruto works towards his dream with fellow friends Sasuke and Sakura and mentor Kakashi as they go through many trials and battles that come with being a ninja.', 7, 435.00, '/images/naruto.jpg', 700, 72, 'Finished', 2, 1),
    ('berserk', 'His name is Guts, the Black Swordsman, a feared warrior spoken of only in whispers. Bearer of a gigantic sword, an iron hand, and the scars of countless battles and tortures, his flesh is also indelibly marked with The Brand, an unholy symbol that draws the forces of darkness to him and dooms him as their sacrifice. But Guts won''t take his fate lying down; he''ll cut a crimson swath of carnage through the ranks of the damned—and anyone else foolish enough to oppose him! Accompanied by Puck the Elf, more an annoyance than a companion, Guts relentlessly follows a dark, bloodstained path that leads only to death...or vengeance.', 25, 375.00, '/images/berserk.jpg', 383, 43, 'Ongoing', 4, 2),
    ('vagabond', 'At seventeen years of age, Miyamoto Musashi--still known by his childhood name, Shinmen Takezo--was a wild young brute just setting out along the way of the sword. In the aftermath of the epic Battle of Sekigahara, Takezo finds himself a fugitive survivor on the losing side of the war. Takezo''s vicious nature has made him an outcast even in his own village, and he is hunted down like an animal. At this crucial crossroads in Takezo''s life, an eccentric monk and a childhood friend are the only ones who can help him find his way.', 75,500.00, '/images/vagabond.jpg', 327, 37, 'Hiatus', 4, 3),
    ('one-piece', 'As a child, Monkey D. Luffy was inspired to become a pirate by listening to the tales of the buccaneer "Red-Haired" Shanks. But his life changed when Luffy accidentally ate the Gum-Gum Devil Fruit and gained the power to stretch like rubber...at the cost of never being able to swim again! Years later, still vowing to become the king of the pirates, Luffy sets out on his adventure...one guy alone in a rowboat, in search of the legendary "One Piece," said to be the greatest treasure in the world...', 60, 623.00, '/images/one-piece.jpg', 1185, 114, 'Ongoing', 2, 4),
    ('pretty-cure', 'Nozomi Yumehara, a regular student, finds a magical book called the Dream Collet in the library and meets Coco and Nuts, two creatures from the Palmier Kingdom. They plead with Nozomi to restore their world, which has been destroyed by an organization called the Nightmares, by completing the Dream Collet and finding the 55 Pinkies to make any wish come true. Meanwhile, the Nightmares are moving into the real world. Once Nozomi agrees to help, Coco and Nuts transform her into the magical girl Cure Dream and turn four fellow students into her Pretty Cure team.', 5, 150.00, '/images/pretty-cure.jpg', 17, 1, 'Finished', 1, 5),
    ('sailor-moon', 'Usagi Tsukino is a normal girl until she meets up with Luna, a talking cat, who tells her that she is Sailor Moon. As Sailor Moon, Usagi must fight evils and enforce justice, in the name of the Moon and the mysterious Moon Princess. She meets other girls destined to be Sailor Senshi (Sailor Scouts), and together, they fight the forces of evil!', 45, 302.00, '/images/sailor-moon.jpg', 61, 18, 'Finished', 3, 6),
    ('princess-jellyfish', 'Tsukimi Kurashita has a strange fascination with jellyfish. She has loved them from a young age and has carried that love with her to her new life in the big city of Tokyo. There, she resides in Amamizukan, a safe-haven for girl geeks who regularly gush over a range of things from trains to Japanese dolls. However, a chance meeting at a pet shop has Tsukimi crossing paths with one of the things that the residents of Amamizukan have been desperately trying to avoid—a beautiful and fashionable woman! But there’s much more to this woman than her trendy clothes! This odd encounter is only the beginning of a new and unexpected path for Tsukimi and her friends.', 105, 922.00, '/images/princess-jellyfish.jpg', 94, 17, 'Finished', 5, 7);   

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