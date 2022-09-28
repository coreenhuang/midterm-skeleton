-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password VARCHAR(120) NOT NULL
);


