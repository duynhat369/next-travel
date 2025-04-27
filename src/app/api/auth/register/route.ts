import { connectToDatabase } from '@/lib/db/mongodb';
import User, { UserResponse } from '@/lib/models/User';
import { registerSchema } from '@/lib/schemas/auth';
import { NextResponse } from 'next/server';

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

    const fieldErrors: { [key: string]: string[] } = {};

    if (await User.findOne({ username })) {
      fieldErrors.username = ['Tên đăng nhập đã tồn tại'];
    }

    if (await User.findOne({ email })) {
      fieldErrors.email = ['Email đã được sử dụng'];
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Thông tin đã tồn tại',
          fieldErrors,
        },
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
    const user: UserResponse = {
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
