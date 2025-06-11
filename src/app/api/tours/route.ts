import { connectToDatabase } from '@/lib/db/mongodb';
import { getTourModel } from '@/lib/schemas/tour';
import { NextRequest, NextResponse } from 'next/server';

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
    const sortParam = searchParams.get('sort') || 'createdAt_desc';
    const [sortBy, sortOrder] = sortParam.split('_');
    const isHot = searchParams.get('isHot') === 'true';
    const hasDiscount = searchParams.get('hasDiscount') === 'true';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sort: any = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
      sort['_id'] = sortOrder === 'asc' ? 1 : -1;
    }

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
