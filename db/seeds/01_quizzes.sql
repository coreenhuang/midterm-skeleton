
INSERT INTO quizzes (id, name, public) VALUES (1,'Colour Quiz', 'yes') returning id;

INSERT INTO questions (qstring, ans1, ans2, ans3, ans4, correct_answer, quiz_id) VALUES ('Fave Colour?', 'Red', 'Pink', 'Blue', 'Green', 'Pink', 1);

SELECT setval('quizzes_id_seq', 1 , true);
SELECT setval('questions_id_seq', 1 , true);
