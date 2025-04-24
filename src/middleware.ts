import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

export default auth((req) => {
  const { nextUrl } = req;
  // Có thể thêm logic middleware khác nếu cần
  return NextResponse.next();
});

// Cấu hình các đường dẫn không cần xử lý bởi middleware nếu cần
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
