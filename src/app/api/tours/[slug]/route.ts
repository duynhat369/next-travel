import { getTourModel } from '@/app/api/tours/route';
import { connectToDatabase } from '@/lib/db/mongodb';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await connectToDatabase();
    const Tour = getTourModel();
    const slug = params.slug;

    // Tìm tour theo ID nếu slug là ObjectId hợp lệ
    let tour;
    if (mongoose.Types.ObjectId.isValid(slug)) {
      tour = await Tour.findById(slug).lean();
    }

    // Nếu không tìm thấy bằng ID, thử tìm bằng slug
    if (!tour) {
      tour = await Tour.findOne({ slug: slug }).lean();
    }

    if (!tour) {
      return NextResponse.json(
        {
          success: false,
          error: 'Không tìm thấy tour',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      tour: tour,
    });
  } catch (error) {
    console.error('Error fetching tour details:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Đã xảy ra lỗi khi lấy thông tin chi tiết tour',
      },
      { status: 500 }
    );
  }
}

// /**
//  * API cập nhật thông tin tour theo slug (chỉ dành cho Admin)
//  * @param request NextRequest - Yêu cầu HTTP
//  * @param params - Các tham số của route, bao gồm slug
//  * @returns NextResponse - Phản hồi HTTP
//  */
// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { slug: string } }
// ) {
//   try {
//     await connectToDatabase();
//     const Tour = getTourModel();
//     const slug = params.slug;
//     const data = await request.json();

//     // Tìm tour theo ID hoặc slug
//     let tour;
//     let query = {};

//     if (mongoose.Types.ObjectId.isValid(slug)) {
//       query = { _id: slug };
//     } else {
//       query = { slug: slug };
//     }

//     // Cập nhật tour
//     const updatedTour = await Tour.findOneAndUpdate(
//       query,
//       { $set: data },
//       { new: true, runValidators: true }
//     );

//     if (!updatedTour) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Không tìm thấy tour',
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       tour: updatedTour,
//     });
//   } catch (error) {
//     console.error('Error updating tour:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: 'Đã xảy ra lỗi khi cập nhật thông tin tour',
//       },
//       { status: 500 }
//     );
//   }
// }

// /**
//  * API xóa tour theo slug (chỉ dành cho Admin)
//  * @param request NextRequest - Yêu cầu HTTP
//  * @param params - Các tham số của route, bao gồm slug
//  * @returns NextResponse - Phản hồi HTTP
//  */
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { slug: string } }
// ) {
//   try {
//     await connectToDatabase();
//     const Tour = getTourModel();
//     const slug = params.slug;

//     // Tìm và xóa tour theo ID hoặc slug
//     let query = {};

//     if (mongoose.Types.ObjectId.isValid(slug)) {
//       query = { _id: slug };
//     } else {
//       query = { slug: slug };
//     }

//     const deletedTour = await Tour.findOneAndDelete(query);

//     if (!deletedTour) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Không tìm thấy tour',
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: 'Tour đã được xóa thành công',
//     });
//   } catch (error) {
//     console.error('Error deleting tour:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: 'Đã xảy ra lỗi khi xóa tour',
//       },
//       { status: 500 }
//     );
//   }
// }
