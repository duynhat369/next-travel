'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ABOUT_US_PAGE, PRODUCTS_PAGE, TOURS_PAGE } from '@/constants';
import { cn } from '@/lib/utils';
import { LogOut, Menu, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthModal } from './auth/AuthModal';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Separator } from './ui/separator';

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
  const { data: session, status } = useSession();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 px-4 pt-4 sm:pt-6">
      <div className="min-w-sm max-w-[1024px] mx-auto flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 bg-white backdrop-blur-md rounded-full shadow-sm">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 font-semibold text-lg text-foreground"
        >
          <div className="bg-foreground text-white w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full font-bold">
            L
          </div>
          <span>Latata</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-foreground">
          {menuItems.map((item) => (
            <div key={item.href} className="relative">
              <Link
                href={item.href}
                target={item.openInNewTab ? '_blank' : '_self'}
                className={cn(
                  'hover:text-secondary transition-colors',
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

        {/* Desktop Auth & Contact */}
        <div className="hidden md:flex items-center space-x-4 text-sm font-medium">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2 cursor-pointer focus-visible:ring-0 focus-visible:border-none"
                >
                  <div className="relative w-8 h-8 overflow-hidden rounded-full">
                    <Image
                      src={session.user.avatar || '/default-avatar.png'}
                      alt="Avatar"
                      width={32}
                      height={32}
                    />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 border-none shadow-2xl">
                <DropdownMenuLabel>Xin chào, {session.user.displayName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer focus:bg-secondary focus:text-white"
                  asChild
                >
                  <Link href="/profile">Thông tin cá nhân</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer focus:bg-secondary focus:text-white"
                  onClick={() => signOut()}
                >
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <AuthModal />
          )}
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
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px] p-0">
              <div className="flex flex-col h-full">
                <SheetHeader className="px-4 py-6">
                  <SheetTitle className="text-left">
                    <Link href="/" className="flex items-center gap-2">
                      <div className="bg-foreground text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                        L
                      </div>
                      <span>Latata</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-auto py-4 px-4">
                  {/* Navigation Links (Mobile) */}
                  <nav className="space-y-1">
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'block py-3 px-3 rounded-md text-foreground hover:bg-muted transition-colors',
                          pathname === item.href && 'bg-primary/10 text-primary font-medium'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  <Separator className="my-4" />
                  {/* User Profile Section (Mobile) */}
                  {session?.user ? (
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-10 h-10 overflow-hidden rounded-full">
                          <Image
                            src={session.user.avatar || '/default-avatar.png'}
                            alt="Avatar"
                            width={40}
                            height={40}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{session.user.displayName}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>Thông tin cá nhân</span>
                        </Link>

                        <button
                          onClick={() => signOut()}
                          className="flex items-center gap-2 text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Đăng xuất</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <AuthModal />
                    </div>
                  )}
                </div>

                {/* Contact Button (Mobile) */}
                <div className="mt-auto p-4">
                  <Link
                    href="#"
                    className="block text-white text-center bg-foreground px-4 py-3 rounded-full hover:bg-foreground-secondary transition-colors w-full"
                  >
                    Liên hệ
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
