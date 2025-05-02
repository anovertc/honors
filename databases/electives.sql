CREATE TABLE electives (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  class_name VARCHAR(100),
  rank_order INT,                         -- 1 to 5
  rating TINYINT,                   -- 0 = not taken
  career_interest VARCHAR(100),
  FOREIGN KEY (student_id) REFERENCES students(student_id)
);