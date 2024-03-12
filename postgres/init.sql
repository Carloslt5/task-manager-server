CREATE TABLE client (
  id UUID PRIMARY KEY,
  "firstName" VARCHAR(255) NOT NULL,
  "lastName" VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

INSERT INTO
  client (id, "firstName", "lastName", email, password)
VALUES
  (
    '123e4567-e89b-12d3-a456-426614174000',
    'Carlos',
    'Admin',
    'admin@example.com',
    'password123'
  );