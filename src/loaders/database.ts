import { Elysia } from "elysia";

import mongoose, { Mongoose } from "mongoose";

class Database {
  static instance: Mongoose;

  static async createConnection() {
    const { DB_HOST, DB_NAME, DB_PORT, DB_URL } = Bun.env;

    const dbConnURL = DB_URL;

    const dbName = DB_NAME as string;

    try {
      const connectionInstance = await mongoose.connect(dbConnURL, {
        autoIndex: true,
        dbName,
      });
      console.log("Database Connection Established");

      Database.instance = connectionInstance;
    } catch (error) {
      console.log('error in setting up db:', error);
    }
  }
}

export default Database;
