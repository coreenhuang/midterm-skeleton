-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  qstring VARCHAR(255) NOT NULL,
  points INTEGER,
  ans1 VARCHAR(120),
  ans2 VARCHAR(120),
  ans3 VARCHAR(120),
  ans4 VARCHAR(120),
  correct_answer VARCHAR(120),
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE
);
