CREATE TABLE mandatory_classes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  class_code VARCHAR(10), -- e.g., CSE231
  rating TINYINT,          -- 0 = not taken
  expectation TINYINT,     -- if rating = 0
  gpa DECIMAL(3,2),
  lecture_quality TINYINT,
  support TINYINT,
  career_relevance TINYINT,
  coding_experience VARCHAR(20),
  FOREIGN KEY (student_id) REFERENCES students(student_id)
);