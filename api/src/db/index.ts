import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/todo-app';

let connection: typeof mongoose | undefined;

export async function connect(url = MONGO_URI): Promise<typeof mongoose> {
  if (connection != null) return connection;

  connection = await mongoose
    .connect(url)
    .then((x) => {
      const dbName = x.connections[0].name;
      console.log(`Connected to Mongo! Database name: "${dbName}"`);
      return x;
    })
    .catch((err) => {
      console.error('Error connecting to mongo: ', err);
      throw err;
    });

  return connection;
}
