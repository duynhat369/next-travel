import { connectToDatabase } from '@/lib/db/mongodb';
import User, { UserResponse } from '@/lib/models/User';
import { loginSchema } from '@/lib/schemas/auth';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const COOKIE_NAME = 'auth-token';

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Parse and validate request body
    const body = await request.json();
    const validationResult = loginSchema.safeParse(body);

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

    const { username, password } = validationResult.data;

    // Find user by username and include password for comparison
    const user = await User.findOne({ username }).select('+password');

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Tên đăng nhập không chính xác' },
        { status: 401 }
      );
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Mật khẩu không chính xác' },
        { status: 401 }
      );
    }

    // Update last login time
    user.lastLogin = new Date();
    await user.save();

    // Create JWT token
    const token = sign({ id: user._id, username: user.username, role: user.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'strict',
    });

    // Return user data without password
    const userData: UserResponse = {
      id: user._id.toString(),
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      avatar: user.avatar,
    };

    return NextResponse.json(
      { success: true, message: 'Đăng nhập thành công', user: userData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Đã xảy ra lỗi khi đăng nhập' },
      { status: 500 }
    );
  }
}
