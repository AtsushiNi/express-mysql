CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)
);

INSERT INTO users (name, email) VALUES
  ('user1', 'user1@test.com'),
  ('user2', 'user2@test.com'),
  ('user3', 'user3@test.com');
