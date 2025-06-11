import { connectToDatabase } from '@/lib/db/mongodb';
import mongoose from 'mongoose';
import { type NextRequest, NextResponse } from 'next/server';
import { calculateCartTotals, getCartModel } from '../route';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    await connectToDatabase();
    const Cart = getCartModel();

    const { quantity, userId } = await request.json();
    const { itemId } = await params;

    // Validation
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ success: false, error: 'User ID không hợp lệ' }, { status: 400 });
    }

    if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
      return NextResponse.json({ success: false, error: 'Item ID không hợp lệ' }, { status: 400 });
    }

    if (quantity < 0) {
      return NextResponse.json({ success: false, error: 'Số lượng không hợp lệ' }, { status: 400 });
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const itemIndex = cart.items.findIndex((item: any) => item._id.toString() === itemId);

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy sản phẩm trong giỏ hàng' },
        { status: 404 }
      );
    }

    if (quantity === 0) {
      // Xóa item nếu quantity = 0
      cart.items.splice(itemIndex, 1);
    } else {
      // Cập nhật quantity
      cart.items[itemIndex].quantity = quantity;
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
      message: quantity === 0 ? 'Xóa sản phẩm thành công' : 'Cập nhật số lượng thành công',
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    await connectToDatabase();
    const Cart = getCartModel();

    const { itemId } = await params;
    const userId = request.nextUrl.searchParams.get('userId');

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

    // Tìm và xóa item
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const itemIndex = cart.items.findIndex((item: any) => item._id.toString() === itemId);

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy sản phẩm trong giỏ hàng' },
        { status: 404 }
      );
    }

    cart.items.splice(itemIndex, 1);

    // Tính toán lại tổng
    const { totalItems, totalAmount } = calculateCartTotals(cart.items);
    cart.totalItems = totalItems;
    cart.totalAmount = totalAmount;

    await cart.save();

    return NextResponse.json({
      success: true,
      message: 'Xóa sản phẩm thành công',
    });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi xóa sản phẩm' },
      { status: 500 }
    );
  }
}
