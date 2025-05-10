import { connectToDatabase } from '@/lib/db/mongodb';
import { Tour } from '@/types/tour.types';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

const tourSchema = new mongoose.Schema<Tour>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    isHot: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export function getTourModel() {
  return mongoose.models.Tour || mongoose.model<Tour>('Tour', tourSchema);
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const Tour = getTourModel();
    const searchParams = request.nextUrl.searchParams;

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '7', 10);
    const skip = (page - 1) * limit;

    // Search and filtering parameters
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const isHot = searchParams.get('isHot') === 'true';
    const hasDiscount = searchParams.get('hasDiscount') === 'true';

    const filter: any = {};

    // Search by title
    if (search) {
      filter.title = { $regex: search, $options: 'i' }; // i: case insensitive
    }

    // Filter for hot tours
    if (isHot) {
      filter.isHot = true;
    }

    // Filter for tours with discount
    if (hasDiscount) {
      filter.discountPercentage = { $gt: 0 };
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Count total tours matching the filter
    const total = await Tour.countDocuments(filter);

    // Get tours with filtering and sorting
    const tours = await Tour.find(filter).sort(sort).skip(skip).limit(limit).lean(); // Return plain JavaScript objects instead of Mongoose Documents

    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;

    return NextResponse.json({
      tours: tours,
      hasMore: hasNext,
      total,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching tours:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Đã xảy ra lỗi khi lấy danh sách tour',
      },
      { status: 500 }
    );
  }
}
