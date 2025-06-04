import { connectToDatabase } from '@/lib/db/mongodb';
import type { Cart, CartItem } from '@/types/cart.types';
import mongoose from 'mongoose';
import { type NextRequest, NextResponse } from 'next/server';
import { getProductModel } from '../products/route';

const cartItemSchema = new mongoose.Schema<CartItem>({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  addedAt: { type: Date, default: Date.now },
  thumbnail: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  freeShip: { type: Boolean, default: false },
});

const cartSchema = new mongoose.Schema<Cart>(
  {
    userId: { type: String, ref: 'User', required: true },
    items: [cartItemSchema],
    totalItems: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'done', 'cancelled'],
      default: 'pending',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better performance
cartSchema.index({ userId: 1 });
cartSchema.index({ 'items.productId': 1 });
cartSchema.index({ status: 1 });
cartSchema.index({ userId: 1, status: 1 });
cartSchema.index({ userId: 1, createdAt: -1 });

export function getCartModel() {
  return mongoose.models.Cart || mongoose.model<Cart>('Cart', cartSchema);
}

// Helper function to calculate cart totals
export function calculateCartTotals(items: CartItem[]) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalAmount };
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const Cart = getCartModel();

    const userId = request.nextUrl.searchParams.get('userId');
    const getSingle = request.nextUrl.searchParams.get('single') === 'true'; // Để lấy 1 giỏ hàng cụ thể
    const status = request.nextUrl.searchParams.get('status');

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, error: 'User ID không hợp lệ' }, { status: 400 });
    }

    // Nếu muốn lấy 1 giỏ hàng cụ thể theo status
    if (getSingle && status) {
      if (!['pending', 'done', 'cancelled'].includes(status)) {
        return NextResponse.json({ success: false, error: 'Status không hợp lệ' }, { status: 400 });
      }

      const cart = await Cart.findOne({ userId, status })
        .populate('items.productId', 'name thumbnail price originalPrice discountPercentage stock')
        .lean();

      if (!cart) {
        // Tạo giỏ hàng mới nếu chưa có (chỉ cho status pending)
        if (status === 'pending') {
          const newCart = new Cart({
            userId,
            items: [],
            totalItems: 0,
            totalAmount: 0,
            status: 'pending',
          });
          await newCart.save();

          return NextResponse.json({
            success: true,
            cart: { ...newCart.toObject(), items: [] },
          });
        } else {
          return NextResponse.json({
            success: true,
            cart: {
              userId,
              items: [],
              totalItems: 0,
              totalAmount: 0,
              status,
            },
          });
        }
      }

      return NextResponse.json({
        success: true,
        cart: cart,
      });
    }

    // Lấy toàn bộ giỏ hàng của user và sắp xếp
    const carts = await Cart.find({ userId })
      .populate('items.productId', 'name thumbnail price originalPrice discountPercentage stock')
      .lean();

    // Sắp xếp theo yêu cầu:
    // 1. Pending (chưa thanh toán) - sắp xếp theo thời gian tạo mới nhất
    // 2. Done/Cancelled (đã thanh toán/hủy) - sắp xếp theo thời gian cũ nhất
    const sortedCarts = carts.sort((a, b) => {
      // Ưu tiên pending lên trên
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (a.status !== 'pending' && b.status === 'pending') return 1;

      // Nếu cùng là pending, sắp xếp theo thời gian tạo mới nhất (desc)
      if (a.status === 'pending' && b.status === 'pending') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      // Nếu cùng là done/cancelled, sắp xếp theo thời gian cũ nhất (asc)
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    });

    // Tính tổng thống kê
    const totalCarts = carts.length;
    const pendingCarts = carts.filter((cart) => cart.status === 'pending').length;
    const doneCarts = carts.filter((cart) => cart.status === 'done').length;
    const cancelledCarts = carts.filter((cart) => cart.status === 'cancelled').length;

    const totalAmount = carts
      .filter((cart) => cart.status === 'done')
      .reduce((sum, cart) => sum + cart.totalAmount, 0);

    const totalItems = carts
      .filter((cart) => cart.status === 'done')
      .reduce((sum, cart) => sum + cart.totalItems, 0);

    return NextResponse.json({
      success: true,
      carts: sortedCarts,
      summary: {
        totalCarts,
        pendingCarts,
        doneCarts,
        cancelledCarts,
        totalAmount,
        totalItems,
      },
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi lấy giỏ hàng' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const Cart = getCartModel();
    const Product = getProductModel();

    const { productId, quantity, userId } = await request.json();

    // Validation
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, error: 'User ID không hợp lệ' }, { status: 400 });
    }

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { success: false, error: 'Product ID không hợp lệ' },
        { status: 400 }
      );
    }

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { success: false, error: 'Số lượng phải lớn hơn 0' },
        { status: 400 }
      );
    }

    // Kiểm tra sản phẩm có tồn tại và còn hàng không
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Sản phẩm không tồn tại' },
        { status: 404 }
      );
    }

    if (product.stock < quantity) {
      return NextResponse.json(
        { success: false, error: 'Số lượng trong kho không đủ' },
        { status: 400 }
      );
    }

    // Tìm hoặc tạo giỏ hàng pending
    let cart = await Cart.findOne({ userId, status: 'pending' });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
        totalItems: 0,
        totalAmount: 0,
        status: 'pending',
      });
    }

    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const existingItemIndex = cart.items.findIndex(
      (item: any) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Cập nhật số lượng nếu sản phẩm đã có
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;

      if (product.stock < newQuantity) {
        return NextResponse.json(
          { success: false, error: 'Số lượng trong kho không đủ' },
          { status: 400 }
        );
      }

      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Thêm sản phẩm mới vào giỏ
      const cartItem: CartItem = {
        productId: new mongoose.Types.ObjectId(productId),
        price: product.price,
        originalPrice: product.originalPrice,
        discountPercentage: product.discountPercentage || 0,
        thumbnail: product.thumbnail,
        name: product.name,
        description: product.description,
        freeShip: product.freeShip,
        quantity,
        addedAt: new Date(),
      };
      cart.items.push(cartItem);
    }

    // Tính toán lại tổng
    const { totalItems, totalAmount } = calculateCartTotals(cart.items);
    cart.totalItems = totalItems;
    cart.totalAmount = totalAmount;

    await cart.save();

    // Populate để trả về thông tin đầy đủ
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.productId', 'name thumbnail price originalPrice discountPercentage stock')
      .lean();

    return NextResponse.json({
      success: true,
      message: 'Thêm sản phẩm vào giỏ hàng thành công',
      cart: populatedCart,
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();
    const Cart = getCartModel();

    const { userId, status } = await request.json();

    // Validation
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, error: 'User ID không hợp lệ' }, { status: 400 });
    }

    if (!['pending', 'done', 'cancelled'].includes(status)) {
      return NextResponse.json({ success: false, error: 'Status không hợp lệ' }, { status: 400 });
    }

    // Tìm giỏ hàng pending của user
    const cart = await Cart.findOne({ userId, status: 'pending' });

    if (!cart) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy giỏ hàng' },
        { status: 404 }
      );
    }

    // Cập nhật status
    cart.status = status;
    await cart.save();

    // Nếu status là done, tạo giỏ hàng pending mới cho user
    if (status === 'done') {
      const newCart = new Cart({
        userId,
        items: [],
        totalItems: 0,
        totalAmount: 0,
        status: 'pending',
      });
      await newCart.save();
    }

    return NextResponse.json({
      success: true,
      message: `Cập nhật trạng thái giỏ hàng thành ${status}`,
      cart,
    });
  } catch (error) {
    console.error('Error updating cart status:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi cập nhật trạng thái giỏ hàng' },
      { status: 500 }
    );
  }
}
