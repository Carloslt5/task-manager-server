export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserID = Pick<User, 'id'>;
export type UserNotID = Omit<User, 'id'>;
