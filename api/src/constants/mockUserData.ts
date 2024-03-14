export const mockAuthToken = 'authToken123';

export const mockClient = [
  {
    id: 'user1_id',
    firstName: 'Test User 1',
    lastName: 'One',
    email: 'testuser1@example.com',
    password: 'Password123',
  },
  {
    id: 'user2_id',
    firstName: 'Test User 2',
    lastName: 'Two',
    email: 'testuser2@example.com',
    password: 'Password456',
  },
];

export const signupTestData = {
  firstName: 'First Name Test',
  lastName: 'Last Name Test',
  email: 'test@email.com',
  password: 'TestPassword123',
};

export const loginDataSuccess = {
  email: mockClient[0].email,
  password: mockClient[0].password,
};

export const loginEmailError = {
  email: 'erroruser@email.com',
  password: mockClient[0].password,
};

export const loginPasswordError = {
  email: mockClient[0].email,
  password: 'ErrorPassword123',
};
