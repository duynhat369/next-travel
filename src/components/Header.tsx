'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ABOUT_US_PAGE, PRODUCTS_PAGE, TOURS_PAGE } from '@/constants';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthModal } from './auth/AuthModal';
import { Button } from './ui/button';

interface MenuItem {
  name: string;
  href: string;
  openInNewTab?: boolean;
}

const menuItems: MenuItem[] = [
  { name: 'Cung đường', href: `/${TOURS_PAGE}` },
  { name: 'Sản phẩm', href: `/${PRODUCTS_PAGE}` },
  { name: 'Về chúng tôi', href: `/${ABOUT_US_PAGE}` },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 px-4 pt-6">
      <div className="min-w-sm max-w-[1024px] mx-auto flex items-center justify-between px-6 py-3 bg-white backdrop-blur-md rounded-full shadow-sm">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 font-semibold text-lg text-foreground"
        >
          <div className="bg-foreground text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
            L
          </div>
          <span>Latata</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-foreground">
          {menuItems.map((item) => (
            <div key={item.href} className="relative">
              <Link
                href={item.href}
                target={item.openInNewTab ? '_blank' : '_self'}
                className={cn(
                  'hover:text-secondary',
                  pathname === item.href && 'font-bold text-primary'
                )}
              >
                {item.name}
              </Link>
              {pathname === item.href && (
                <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4 text-sm font-medium">
          <AuthModal />
          <Link
            href="#"
            className="text-white bg-foreground border border-foreground px-3 py-2 rounded-full hover:bg-foreground-secondary transition-colors"
          >
            Liên hệ
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8 text-foreground text-base font-medium">
                  <SheetTitle>
                    <div className="flex items-center gap-4">
                      <Link href="/" className="flex items-center gap-2">
                        LATATA
                      </Link>
                    </div>
                  </SheetTitle>
                  <SheetDescription className="text-start">
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'block py-2 text-foreground',
                          pathname === item.href && 'text-custom-primary'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}

                    <Button variant="text" className="block px-0 my-4">
                      Đăng nhập/ Đăng ký
                    </Button>
                    <Link
                      href="#"
                      className="block text-white text-center bg-foreground px-4 py-2 rounded-full hover:bg-foreground-secondary transition-colors"
                    >
                      Liên hệ
                    </Link>
                  </SheetDescription>
                </nav>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
