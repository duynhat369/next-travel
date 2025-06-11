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
  status: {
    type: String,
    enum: ['pending', 'done', 'cancelled'],
    default: 'pending',
    required: true,
  },
});

const cartSchema = new mongoose.Schema<Cart>(
  {
    userId: { type: String, ref: 'User', required: true },
    items: [cartItemSchema],
    totalItems: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
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
  const totalItems = items.length;
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalAmount };
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const Cart = getCartModel();

    // Đảm bảo model Product được đăng ký trước khi populate
    getProductModel();

    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, error: 'User ID không hợp lệ' }, { status: 400 });
    }
    const cartData = await Cart.findOne({ userId }).lean();
    const cart = cartData as Cart | null;

    // Nếu chưa có giỏ hàng, tạo mới
    if (!cart) {
      const newCart = new Cart({
        userId,
        items: [],
      });
      await newCart.save();

      return NextResponse.json({
        success: true,
        cart: {
          _id: newCart._id,
          userId,
          items: [],
          createdAt: newCart.createdAt,
          updatedAt: newCart.updatedAt,
        },
        stats: {
          totalItems: 0,
          pendingItems: 0,
          doneItems: 0,
          cancelledItems: 0,
          totalQuantity: 0,
          pendingQuantity: 0,
        },
      });
    }

    // Sắp xếp items trong cart: pending trước, done/cancelled sau
    if (cart.items && cart.items.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cart.items.sort((a: any, b: any) => {
        // Ưu tiên pending lên trước
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;

        // Cùng status thì sắp xếp theo thời gian thêm vào (mới nhất trước)
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      });
    }

    return NextResponse.json({
      success: true,
      cart,
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

    // Tìm hoặc tạo giỏ hàng
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
        totalItems: 0,
        totalAmount: 0,
      });
    }

    // Kiểm tra sản phẩm đã có trong giỏ chưa
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        status: 'pending',
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

// PUT - Cập nhật số lượng sản phẩm trong giỏ hàng
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();
    const Cart = getCartModel();
    const Product = getProductModel();

    const { itemId, quantity, userId } = await request.json();

    // Validation
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, error: 'User ID không hợp lệ' }, { status: 400 });
    }

    if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
      return NextResponse.json({ success: false, error: 'Item ID không hợp lệ' }, { status: 400 });
    }

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { success: false, error: 'Số lượng phải lớn hơn 0' },
        { status: 400 }
      );
    }

    // Tìm giỏ hàng của user
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy giỏ hàng' },
        { status: 404 }
      );
    }

    // Tìm item trong giỏ hàng
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const itemIndex = cart.items.findIndex((item: any) => item._id.toString() === itemId);

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy sản phẩm trong giỏ hàng' },
        { status: 404 }
      );
    }

    // Kiểm tra số lượng tồn kho
    const product = await Product.findById(cart.items[itemIndex].productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Sản phẩm không tồn tại' },
        { status: 404 }
      );
    }

    // if (product.stock < quantity) {
    //   return NextResponse.json(
    //     { success: false, error: 'Số lượng trong kho không đủ' },
    //     { status: 400 }
    //   );
    // }

    // Cập nhật số lượng
    cart.items[itemIndex].quantity = quantity;

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
      message: 'Cập nhật số lượng thành công',
      cart: populatedCart,
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi cập nhật sản phẩm' },
      { status: 500 }
    );
  }
}

// DELETE - Xóa sản phẩm khỏi giỏ hàng
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();
    const Cart = getCartModel();

    const { itemId, userId } = await request.json();

    // Validation
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, error: 'User ID không hợp lệ' }, { status: 400 });
    }

    if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
      return NextResponse.json({ success: false, error: 'Item ID không hợp lệ' }, { status: 400 });
    }

    // Tìm giỏ hàng của user
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy giỏ hàng' },
        { status: 404 }
      );
    }

    // Tìm và xóa item khỏi giỏ hàng
    const originalLength = cart.items.length;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cart.items = cart.items.filter((item: any) => item._id.toString() !== itemId);

    if (cart.items.length === originalLength) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy sản phẩm trong giỏ hàng' },
        { status: 404 }
      );
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
      message: 'Xóa sản phẩm khỏi giỏ hàng thành công',
      cart: populatedCart,
    });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi xóa sản phẩm' },
      { status: 500 }
    );
  }
}
