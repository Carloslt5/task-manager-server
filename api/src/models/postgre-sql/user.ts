import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Pool, QueryResult } from 'pg';
import { dbConfig } from '../../db';
import { UserPayload } from '../../middlewares/requireAuth';
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

  async signToken({ id, firstName, lastName }: UserPayload) {
    const payload = { id, firstName, lastName };
    const authToken: string = jwt.sign(payload, process.env.TOKEN_SECRET ?? 'secret', {
      algorithm: 'HS256',
      expiresIn: '6h',
    });
    return authToken;
  }
  async checkOwnerForUser(userId: string, profileId: string): Promise<number> {
    const result = await db.query('SELECT COUNT(*) FROM client WHERE id = $1 OR id = $2', [userId, profileId]);
    return result.rows[0].count;
  }
}

export const usermodel = new UserModel();
