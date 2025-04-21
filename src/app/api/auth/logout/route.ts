// src/app/api/auth/logout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const COOKIE_NAME = 'auth-token';

export async function POST() {
  try {
    // Lấy cookieStore (cần await vì nó là Promise)
    const cookieStore = await cookies();

    // Xóa cookie theo cách mới
    cookieStore.set({
      name: COOKIE_NAME,
      value: '',
      expires: new Date(0),
      path: '/',
    });

    return NextResponse.json({ success: true, message: 'Đăng xuất thành công' }, { status: 200 });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Đã xảy ra lỗi khi đăng xuất' },
      { status: 500 }
    );
  }
}
