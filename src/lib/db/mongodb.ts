import mongoose from 'mongoose';

// Định nghĩa interface cho cấu trúc cache
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Định nghĩa kiểu cho biến global
declare global {
  var mongoose: MongooseCache | undefined;
}

// Biến môi trường URI MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

// Kiểm tra URI
if (!MONGODB_URI) {
  throw new Error('Vui lòng định nghĩa biến môi trường MONGODB_URI');
}

// Các tùy chọn kết nối MongoDB
const options: mongoose.ConnectOptions = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  maxPoolSize: 10,
  retryWrites: true,
};

// Khởi tạo cache
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

// Lưu cache vào biến global
if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Kết nối đến MongoDB và tái sử dụng kết nối giữa các request
 * @returns Promise<typeof mongoose> Đối tượng mongoose đã kết nối
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  // Nếu đã có kết nối, trả về kết nối đó
  if (cached.conn) {
    return cached.conn;
  }

  // Nếu chưa có promise kết nối, tạo mới
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!, options)
      .then((mongoose) => {
        console.log('Connected to MongoDB successfully');
        return mongoose;
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        cached.promise = null;
        throw err;
      });
  }

  try {
    // Đợi kết nối hoàn thành và lưu vào cache
    const mongoose = await cached.promise;
    cached.conn = mongoose;
    return mongoose;
  } catch (err) {
    cached.promise = null;
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

/**
 * Kiểm tra kết nối đến MongoDB
 * @returns Promise<boolean> true nếu kết nối thành công, false nếu thất bại
 */
export async function checkConnection(): Promise<boolean> {
  try {
    const mongoose = await connectToDatabase();
    await mongoose.connection.db?.admin().ping();
    return true;
  } catch (err) {
    console.error('MongoDB connection check failed:', err);
    return false;
  }
}
