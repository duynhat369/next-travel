// src/lib/db/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nextjs-auth';

// Biến lưu lại kết nối
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const options = {
      bufferCommands: false,
    };

    cached = global.mongoose = {
      conn: null,
      promise: mongoose.connect(MONGODB_URI, options).then((mongoose) => {
        return mongoose;
      }),
    };
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}
