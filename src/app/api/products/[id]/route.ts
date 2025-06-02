import { connectToDatabase } from '@/lib/db/mongodb';
import mongoose from 'mongoose';
import { type NextRequest, NextResponse } from 'next/server';
import { getProductModel } from '../route';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const Product = getProductModel();
    const { id } = await params;

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'ID sản phẩm không hợp lệ',
        },
        { status: 400 }
      );
    }

    // Find product by ID
    const product = await Product.findById(id).lean(); // Return plain JavaScript object

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Không tìm thấy sản phẩm',
        },
        { status: 404 }
      );
    }

    // Return the product
    return NextResponse.json({
      success: true,
      product: product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Đã xảy ra lỗi khi lấy thông tin sản phẩm',
      },
      { status: 500 }
    );
  }
}

// Optional: Add PUT method for updating product
// export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     await connectToDatabase()
//     const Product = getProductModel()
//     const { id } = await params
//     const body = await request.json()

//     // Validate if the ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "ID sản phẩm không hợp lệ",
//         },
//         { status: 400 },
//       )
//     }

//     // Calculate discount percentage if originalPrice and price are provided
//     if (body.originalPrice && body.price && !body.discountPercentage) {
//       body.discountPercentage = Math.round(((body.originalPrice - body.price) / body.originalPrice) * 100)
//     }

//     // Update product
//     const updatedProduct = await Product.findByIdAndUpdate(id, body, {
//       new: true, // Return the updated document
//       runValidators: true, // Run schema validators
//     }).lean()

//     if (!updatedProduct) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Không tìm thấy sản phẩm để cập nhật",
//         },
//         { status: 404 },
//       )
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Cập nhật sản phẩm thành công",
//       product: updatedProduct,
//     })
//   } catch (error: any) {
//     console.error("Error updating product:", error)

//     if (error.code === 11000) {
//       return NextResponse.json({ success: false, error: "Mã sản phẩm đã tồn tại" }, { status: 400 })
//     }

//     if (error.name === "ValidationError") {
//       return NextResponse.json({ success: false, error: "Dữ liệu không hợp lệ" }, { status: 400 })
//     }

//     return NextResponse.json({ success: false, error: "Đã xảy ra lỗi khi cập nhật sản phẩm" }, { status: 500 })
//   }
// }

// Optional: Add DELETE method for deleting product
// export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     await connectToDatabase()
//     const Product = getProductModel()
//     const { id } = await params

//     // Validate if the ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "ID sản phẩm không hợp lệ",
//         },
//         { status: 400 },
//       )
//     }

//     // Delete product
//     const deletedProduct = await Product.findByIdAndDelete(id).lean()

//     if (!deletedProduct) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Không tìm thấy sản phẩm để xóa",
//         },
//         { status: 404 },
//       )
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Xóa sản phẩm thành công",
//       product: deletedProduct,
//     })
//   } catch (error) {
//     console.error("Error deleting product:", error)
//     return NextResponse.json({ success: false, error: "Đã xảy ra lỗi khi xóa sản phẩm" }, { status: 500 })
//   }
// }
