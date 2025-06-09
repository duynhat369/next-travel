import { connectToDatabase } from '@/lib/db/mongodb';
import getBookingModel from '@/lib/models/Booking';
import User from '@/lib/models/User';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { getTourModel } from '../tours/route';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const Booking = getBookingModel();
    const Tour = getTourModel();

    const userId = request.nextUrl.searchParams.get('userId');

    // Validation
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, error: 'User ID không hợp lệ' }, { status: 400 });
    }

    // Kiểm tra user có tồn tại không
    const user = await User.findById(new mongoose.Types.ObjectId(userId));
    if (!user) {
      return NextResponse.json({ success: false, error: 'User không tồn tại' }, { status: 404 });
    }

    // Lấy toàn bộ bookings của user, sắp xếp theo ngày đặt mới nhất
    // Populate cả thông tin user và tour
    const bookings = await Booking.find({ userId: new mongoose.Types.ObjectId(userId) })
      .populate('userId', 'name email avatar') // Populate thông tin user
      .populate(
        'tourId',
        'title slug description price originalPrice discountPercentage thumbnail isHot gallery'
      ) // Populate thông tin tour
      .sort({ bookingDate: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi lấy danh sách đặt tour' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const Booking = getBookingModel();
    // Parse request body
    const body = await request.json();

    const { userId, tourId, tourStartDate, tourEndDate, numberOfParticipants, phoneNumber } = body;

    const user = await User.findById(new mongoose.Types.ObjectId(userId));

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const newBooking = new Booking({
      userId: new mongoose.Types.ObjectId(userId),
      tourId: new mongoose.Types.ObjectId(tourId),
      bookingDate: new Date(),
      tourStartDate: new Date(tourStartDate),
      tourEndDate: new Date(tourEndDate),
      numberOfParticipants,
      phoneNumber,
      user,
      status: 'pending',
      statusHistory: [
        {
          status: 'pending',
          changedAt: new Date(),
          reason: 'Booking được tạo',
        },
      ],
    });

    const savedBooking = await newBooking.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Booking được tạo thành công',
        booking: savedBooking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Đã xảy ra lỗi khi tạo booking',
      },
      { status: 500 }
    );
  }
}
