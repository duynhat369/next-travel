import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const registerSchema = z
  .object({
    username: z.string().min(3).max(50),
    displayName: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    phoneNumber: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Parse and validate request body
    const body = await request.json();
    const validationResult = registerSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Dữ liệu không hợp lệ',
          errors: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { username, displayName, email, password, phoneNumber } = validationResult.data;

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        { success: false, message: 'Tên đăng nhập đã tồn tại' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { success: false, message: 'Email đã được sử dụng' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = await User.create({
      username,
      displayName,
      email,
      password,
      phoneNumber,
      provider: 'local',
    });

    // Return user without password
    const user = {
      id: newUser._id.toString(),
      username: newUser.username,
      displayName: newUser.displayName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      avatar: newUser.avatar,
    };

    return NextResponse.json(
      { success: true, message: 'Đăng ký thành công', user },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, message: 'Đã xảy ra lỗi khi đăng ký' },
      { status: 500 }
    );
  }
}
