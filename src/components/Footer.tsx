import { ABOUT_US_PAGE, CONTACT_PAGE, PRODUCTS_PAGE } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer
      className="relative bg-cover bg-center"
      style={{ backgroundImage: "url('/images/footer-background.png')" }}
    >
      <div className="container mx-auto px-4 py-12 text-white">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex-1">
            <div className="relative mb-2">
              <Image src="/logo.png" alt="logo" width={80} height={32} className="w-20 h-8" />
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-4">
              <p className="">Hot line: 0815567712</p>
              <p className="">Email: duynhat719@gmail.com</p>
              <p className="">
                Địa chỉ: 12 Tôn Thất Thuyết, Phường Cầu Ông Lãnh, Quận Tân Bình, TP HCM.
              </p>
            </div>
            <div className="dive"></div>
          </div>
          <div className="flex-1 flex flex-col md:flex-row gap-8">
            <div className="w-full">
              <h3 className="relative text-md md:text-xl text-primary font-bold mb-2">
                Chính sách
              </h3>
              <div className="w-full flex flex-col items-start justify-center gap-4">
                <Link
                  href={`/${CONTACT_PAGE}#FAQs`}
                  className="text-muted-foreground text-xs md:text-sm hover:text-white"
                >
                  FAQs
                </Link>
                <Link
                  href={`/${ABOUT_US_PAGE}`}
                  className="text-muted-foreground text-xs md:text-sm hover:text-white"
                >
                  Về chúng tôi
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground text-xs md:text-sm hover:text-white"
                >
                  Quy định
                </Link>
              </div>
            </div>
            <div className="w-full">
              <h3 className="relative text-md md:text-xl text-primary font-bold mb-2">Sản phẩm</h3>
              <div className="w-full flex flex-col items-start justify-center gap-4">
                <Link
                  href={`/${PRODUCTS_PAGE}`}
                  className="text-muted-foreground text-xs md:text-sm hover:text-white"
                >
                  Đồ lưu niệm
                </Link>
                <Link
                  href={`/${PRODUCTS_PAGE}`}
                  className="text-muted-foreground text-xs md:text-sm hover:text-white"
                >
                  Đồ xe máy
                </Link>
                <Link
                  href={`/${PRODUCTS_PAGE}`}
                  className="text-muted-foreground text-xs md:text-sm hover:text-white"
                >
                  Đồ handmade
                </Link>
                <Link
                  href={`/${PRODUCTS_PAGE}`}
                  className="text-muted-foreground text-xs md:text-sm hover:text-white"
                >
                  Phụ kiện
                </Link>
              </div>
            </div>
            <div className="w-full">
              <h3 className="relative text-md md:text-xl text-primary font-bold mb-2">
                Thông tin khác
              </h3>
              <div className="w-full flex flex-col items-start justify-center gap-4">
                <Link
                  href={'https://www.facebook.com/duyNhatDeveloper/'}
                  target="_blank"
                  className="text-muted-foreground text-xs md:text-sm hover:text-white"
                >
                  Cộng đồng camping
                </Link>
                <Link
                  href={'https://www.trangcuanhat.com/'}
                  target="_blank"
                  className="text-muted-foreground text-xs md:text-sm hover:text-white"
                >
                  Travel blog
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-8">
          <p className="font-semibold">Copyright © 2025 Nguyen Duy Nhat</p>
        </div>
      </div>
    </footer>
  );
};
