import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import mongoose from 'mongoose';
import { type NextRequest, NextResponse } from 'next/server';

// API PUT - Cập nhật thông tin user
export async function PUT(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    await connectToDatabase();

    const { userId } = params;
    const body = await request.json();
    const { email, phoneNumber } = body;

    // Validation
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, error: 'User ID không hợp lệ' }, { status: 400 });
    }

    // Kiểm tra user có tồn tại không
    const user = await User.findById(new mongoose.Types.ObjectId(userId));
    if (!user) {
      return NextResponse.json({ success: false, error: 'User không tồn tại' }, { status: 404 });
    }

    // Cập nhật thông tin
    const updatedUser = await User.findByIdAndUpdate(
      new mongoose.Types.ObjectId(userId),
      {
        email,
        phoneNumber,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).lean();

    return NextResponse.json({
      success: true,
      message: 'Cập nhật thông tin thành công',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi cập nhật thông tin' },
      { status: 500 }
    );
  }
}

// API GET - Lấy thông tin user
export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    await connectToDatabase();

    const { userId } = params;

    // Validation
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, error: 'User ID không hợp lệ' }, { status: 400 });
    }

    // Lấy thông tin user
    const user = await User.findById(new mongoose.Types.ObjectId(userId)).lean();

    if (!user) {
      return NextResponse.json({ success: false, error: 'User không tồn tại' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi lấy thông tin user' },
      { status: 500 }
    );
  }
}
