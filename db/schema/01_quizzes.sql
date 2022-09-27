-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS quizzes CASCADE;
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  public VARCHAR(10) NOT NULL
);
