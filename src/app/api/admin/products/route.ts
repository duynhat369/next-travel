import { connectToDatabase } from '@/lib/db/mongodb';
import { getProductModel } from '@/lib/schemas/product';
import { generateProductCode } from '@/utils/generateProductCode';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const Product = getProductModel();

    const body = await request.json();
    // Validate required fields
    const requiredFields = [
      'name',
      'description',
      'categoryType',
      'price',
      'originalPrice',
      'thumbnail',
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Trường ${field} là bắt buộc` },
          { status: 400 }
        );
      }
    }

    const product = new Product({ ...body, productCode: generateProductCode() });
    await product.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Tạo sản phẩm thành công',
        product: product,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating product:', error);
    if (error.productCode === 11000) {
      return NextResponse.json(
        { success: false, error: 'Mã sản phẩm đã tồn tại' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi tạo sản phẩm' },
      { status: 500 }
    );
  }
}
