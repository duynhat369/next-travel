// /api/cart/checkout-item/route.ts - API thanh toán từng sản phẩm
import { connectToDatabase } from '@/lib/db/mongodb';
import { CartItem } from '@/types/cart.types';
import mongoose from 'mongoose';
import { type NextRequest, NextResponse } from 'next/server';
import { calculateCartTotals, getCartModel } from '../route';

export async function POST(request: NextRequest) {
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

    // Tìm item trong giỏ hàng
    const itemIndex = cart.items.findIndex((item: CartItem) => item._id?.toString() === itemId);

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy sản phẩm trong giỏ hàng' },
        { status: 404 }
      );
    }

    // Kiểm tra trạng thái hiện tại
    if (cart.items[itemIndex].status === 'done') {
      return NextResponse.json(
        { success: false, error: 'Sản phẩm đã được thanh toán' },
        { status: 400 }
      );
    }

    if (cart.items[itemIndex].status === 'cancelled') {
      return NextResponse.json({ success: false, error: 'Sản phẩm đã bị hủy' }, { status: 400 });
    }

    // Cập nhật trạng thái thành done
    cart.items[itemIndex].status = 'done';

    // Tính toán lại tổng (chỉ tính các item pending)
    const pendingItems = cart.items.filter((item: any) => item.status === 'pending');
    const { totalItems, totalAmount } = calculateCartTotals(pendingItems);
    cart.totalItems = totalItems;
    cart.totalAmount = totalAmount;

    await cart.save();

    // Populate để trả về thông tin đầy đủ
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.productId', 'name thumbnail price originalPrice discountPercentage stock')
      .lean();

    return NextResponse.json({
      success: true,
      message: 'Thanh toán sản phẩm thành công',
      cart: populatedCart,
      paidItem: cart.items[itemIndex],
    });
  } catch (error) {
    console.error('Error checking out item:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi thanh toán sản phẩm' },
      { status: 500 }
    );
  }
}
