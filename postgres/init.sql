CREATE TABLE client (
  id UUID PRIMARY KEY,
  "firstName" VARCHAR(255) NOT NULL,
  "lastName" VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE project (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  "ownerID" UUID REFERENCES client(id)
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

INSERT INTO
  project (id, title, description, "ownerID")
VALUES
  (
    'A8D6D621-8920-46E5-B769-F54351AF031B',
    'Projecto 1',
    'Description project 1',
    '123e4567-e89b-12d3-a456-426614174000'
  ),
  (
    'B8D6D621-8920-46E5-B769-F54351AF031B',
    'Proyecto 2',
    'Descripción del proyecto 2',
    '123e4567-e89b-12d3-a456-426614174000'
  );