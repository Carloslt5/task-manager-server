import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
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

  async encryptPassword(password: string) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }

  async findOne({ email }: { email: string }): Promise<QueryResult<User>> {
    return db.query('SELECT * FROM client WHERE email = $1', [email]);
  }

  async signToken({ id, firstName, lastName }: { id: string; firstName: string; lastName: string }) {
    const payload = { id, firstName, lastName };
    const authToken: string = jwt.sign(payload, process.env.TOKEN_SECRET ?? ('secret' as Secret), {
      algorithm: 'HS256',
      expiresIn: '6h',
    });
    return authToken;
  }
}

export const usermodel = new UserModel();
