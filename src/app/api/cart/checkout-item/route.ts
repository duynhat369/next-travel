import { connectToDatabase } from '@/lib/db/mongodb';
import mongoose from 'mongoose';
import { type NextRequest, NextResponse } from 'next/server';
import { getProductModel } from '../../products/route';
import { getCartModel } from '../route';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const Cart = getCartModel();
    const Product = getProductModel();

    const { itemId, userId } = await request.json();

    // Validation
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, error: 'User ID không hợp lệ' }, { status: 400 });
    }

    if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
      return NextResponse.json({ success: false, error: 'Item ID không hợp lệ' }, { status: 400 });
    }

    // Tìm giỏ hàng pending của user
    const cart = await Cart.findOne({ userId, status: 'pending' });

    if (!cart) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy giỏ hàng' },
        { status: 404 }
      );
    }

    // Tìm item trong giỏ hàng
    const itemIndex = cart.items.findIndex((item: any) => item._id.toString() === itemId);

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy sản phẩm trong giỏ hàng' },
        { status: 404 }
      );
    }

    const item = cart.items[itemIndex];

    // Kiểm tra tồn kho
    const product = await Product.findById(item.productId);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Sản phẩm không tồn tại' },
        { status: 404 }
      );
    }

    if (product.stock === 0) {
      return NextResponse.json({ success: false, error: 'Sản phẩm đã hết hàng' }, { status: 400 });
    }

    if (product.stock < item.quantity) {
      return NextResponse.json(
        {
          success: false,
          error: `Số lượng trong kho không đủ. Chỉ còn ${product.stock} sản phẩm`,
        },
        { status: 400 }
      );
    }

    // Cập nhật tồn kho sản phẩm
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { stock: -item.quantity },
    });

    // Tạo đơn hàng mới cho item này
    const orderCart = new Cart({
      userId,
      items: [item],
      totalItems: item.quantity,
      totalAmount: item.price * item.quantity,
      status: 'done',
    });
    await orderCart.save();

    // Xóa item khỏi giỏ hàng pending
    cart.items.splice(itemIndex, 1);

    // Tính toán lại tổng cho giỏ hàng pending
    const totalItems = cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    const totalAmount = cart.items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    cart.totalItems = totalItems;
    cart.totalAmount = totalAmount;

    await cart.save();

    // Tạo order ID
    const orderId = `ORDER_${Date.now()}_${itemId.slice(-6)}`;

    return NextResponse.json({
      success: true,
      message: 'Thanh toán sản phẩm thành công',
      orderId,
      total: item.price * item.quantity,
      item,
    });
  } catch (error) {
    console.error('Error during single item checkout:', error);
    return NextResponse.json({ success: false, error: 'Thanh toán thất bại' }, { status: 500 });
  }
}
