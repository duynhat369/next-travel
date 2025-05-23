import { connectToDatabase } from '@/lib/db/mongodb';
import getBookingModel from '@/lib/models/Booking';
import User from '@/lib/models/User';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

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
