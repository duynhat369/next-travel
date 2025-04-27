import bcrypt from 'bcryptjs';
import mongoose, { Document, Schema } from 'mongoose';

// Định nghĩa interface cho User (gọi là loại tài liệu)
interface IUser extends Document {
  username: string;
  displayName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  avatar?: string;
  role: 'user' | 'admin';
  provider: 'local' | 'google';
  googleId?: string;
  lastLogin: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
export interface UserResponse {
  id: string;
  username: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Vui lòng nhập tên đăng nhập'],
      unique: true,
      trim: true,
      minlength: [3, 'Tên đăng nhập phải có ít nhất 3 ký tự'],
      maxlength: [30, 'Tên đăng nhập không được quá 30 ký tự'],
      validate: [
        {
          validator: function (v) {
            // Regex kiểm tra chỉ chứa chữ cái và chữ số, không có ký tự đặc biệt và khoảng trắng
            return /^[a-zA-Z0-9]+$/.test(v);
          },
          message: 'Tên đăng nhập chỉ được chứa chữ cái và chữ số.',
        },
      ],
    },
    displayName: {
      type: String,
      required: [true, 'Vui lòng nhập tên hiển thị'],
      trim: true,
      minlength: [2, 'Tên hiển thị phải có ít nhất 2 ký tự'],
      maxlength: [30, 'Tên đăng nhập không được quá 30 ký tự'],
    },
    email: {
      type: String,
      required: [true, 'Vui lòng nhập email'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'Email không hợp lệ',
      },
    },
    password: {
      type: String,
      required: [true, 'Vui lòng nhập mật khẩu'],
      minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự'],
      select: false, // Không trả về password khi query
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    provider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    googleId: {
      type: String,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware để hash password trước khi lưu
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next(); // Chỉ hash password nếu nó được thay đổi

  try {
    const salt = await bcrypt.genSalt(10); // Sinh salt với 10 vòng
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Tiếp tục lưu dữ liệu
  } catch (error) {
    if (error instanceof Error) {
      // Kiểm tra nếu lỗi là một instance của Error
      next(error); // Gọi callback với lỗi nếu là instance của Error
    } else {
      next(new Error('Đã xảy ra lỗi không xác định')); // Nếu không phải lỗi kiểu Error, tạo lỗi mới
    }
  }
});

// Method để so sánh password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Tạo và xuất model
const User = mongoose.models?.User || mongoose.model<IUser>('User', userSchema);

export default User;
