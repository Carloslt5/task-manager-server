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
    '0c3d375d-1862-49f1-9364-7f81e8800f20',
    'Admin',
    'Admin',
    'admin@example.com',
    '$2b$10$cg4drDybp2fThekqP5KMp.uRMyhetUYb1Cy2wAfOOHW9.Ytq/ty2i'
  );

INSERT INTO
  project (id, title, description, "ownerID")
VALUES
  (
    '0c3d375d-1862-49f1-9364-7f81e8800f20',
    'Projecto 1',
    'Description project 1',
    '123e4567-e89b-12d3-a456-426614174000'
  ),
  (
    '0c3d375d-1862-49f1-9364-7f81e8800f20',
    'Proyecto 2',
    'Descripción del proyecto 2',
    '123e4567-e89b-12d3-a456-426614174000'
  );