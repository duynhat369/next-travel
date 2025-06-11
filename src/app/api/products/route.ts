import { PaginationInfo } from '@/components/Pagination';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Product } from '@/types/product.types';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

const productSchema = new mongoose.Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    productCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    thumbnail: { type: String, required: true },
    gallery: { type: [String], default: [] },
    categoryType: {
      type: [String],
      required: true,
      enum: ['souvenir', 'camping', 'clothing', 'motor'],
    },
    stock: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ categoryType: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });

export function getProductModel() {
  return mongoose.models.Product || mongoose.model<Product>('Product', productSchema);
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const Product = getProductModel();
    const searchParams = request.nextUrl.searchParams;

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const skip = (page - 1) * limit;

    // Search and filtering parameters
    const search = searchParams.get('search') || '';
    const sortParam = searchParams.get('sort') || 'createdAt_desc';
    const [sortBy, sortOrder] = sortParam.split('_');

    // Filter parameters
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const hasDiscount = searchParams.get('hasDiscount') === 'true';
    const inStock = searchParams.get('inStock') === 'true';
    const freeShip = searchParams.get('freeShip') === 'true';
    const limited = searchParams.get('limited') === 'true';

    // Build filter object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};

    // Search by name and description
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { productCode: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    if (category) {
      filter.categoryType = { $in: [category] };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Filter for products with discount
    if (hasDiscount) {
      filter.discountPercentage = { $gt: 0 };
    }
    // Filter for in-stock products
    if (inStock) {
      filter.stock = { $gt: 0 };
    }
    if (freeShip) {
      filter.freeShip = true;
    }
    if (limited) {
      filter.limited = true;
    }

    // Build sort object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sort: any = {};
    if (sortBy) {
      // only allowed sort by price
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
      sort['_id'] = sortOrder === 'asc' ? 1 : -1;
    }

    // Count total products matching the filter
    const total = await Product.countDocuments(filter);

    // Get products with filtering and sorting
    const products = await Product.find(filter).sort(sort).skip(skip).limit(limit).lean(); // Return plain JavaScript objects

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return NextResponse.json({
      success: true,
      products: products,
      pagination: {
        currentPage: page,
        totalPages,
        total,
        hasNext,
        hasPrev,
        limit,
      } as PaginationInfo,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Đã xảy ra lỗi khi lấy danh sách sản phẩm',
      },
      { status: 500 }
    );
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     await connectToDatabase();
//     const Product = getProductModel();

//     const body = await request.json();

//     // Validate required fields
//     const requiredFields = [
//       'name',
//       'description',
//       'content',
//       'productCode',
//       'price',
//       'originalPrice',
//       'thumbnail',
//       'categoryType',
//     ];
//     for (const field of requiredFields) {
//       if (!body[field]) {
//         return NextResponse.json(
//           { success: false, error: `Trường ${field} là bắt buộc` },
//           { status: 400 }
//         );
//       }
//     }

//     // Calculate discount percentage if not provided
//     if (!body.discountPercentage && body.originalPrice > body.price) {
//       body.discountPercentage = Math.round(
//         ((body.originalPrice - body.price) / body.originalPrice) * 100
//       );
//     }

//     const product = new Product(body);
//     await product.save();

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Tạo sản phẩm thành công',
//         product: product,
//       },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.error('Error creating product:', error);

//     if (error.code === 11000) {
//       return NextResponse.json(
//         { success: false, error: 'Mã sản phẩm đã tồn tại' },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { success: false, error: 'Đã xảy ra lỗi khi tạo sản phẩm' },
//       { status: 500 }
//     );
//   }
// }
