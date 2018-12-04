Create TABLE users1 (
    id INT AUTO_INCREMENT,
    username TEXT,
    password TEXT,
    PRIMARY KEY(id)
);

CREATE TABLE uploaded (
    id INT AUTO_INCREMENT,
    product TEXT,
    price TEXT,
    year TEXT,
    stars TEXT,
    model TEXT,
    thumbnail TEXT,
    image TEXT,
    original TEXT,
    PRIMARY KEY(id)
);

CREATE TABLE save_like(
    username text,
    review_id INT
);
CREATE TABLE uploadedREviews(
    username TEXT,
    review_id INT,
    user_id INT
);

ALTER TABLE users1
ADD posts INT(10);