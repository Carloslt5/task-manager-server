import bcrypt from 'bcrypt';
import { Pool, QueryResult } from 'pg';
import { dbConfig } from '../../db';
import { type User, type UserNotID } from '../../schemas/user.type';

const db = new Pool(dbConfig);

class UserModel {
  async signup({ firstName, lastName, email, password }: UserNotID): Promise<QueryResult<User>> {
    const newID = crypto.randomUUID();
    const hashedPassword = await this.encryptPassword(password);
    return await db.query(
      `
    INSERT INTO client (id, "firstName", "lastName", email, password)
     VALUES ($1,$2,$3,$4,$5) `,
      [newID, firstName, lastName, email, hashedPassword],
    );
  }

  async get(): Promise<QueryResult<User>> {
    return await db.query(`SELECT * FROM client`);
  }

  private async encryptPassword(password: string) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  private async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}

export const usermodel = new UserModel();
