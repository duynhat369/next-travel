import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer
      className="relative bg-cover bg-center"
      style={{ backgroundImage: "url('/images/footer-background-wave.png')" }}
    >
      <div className="container mx-auto px-4 py-12 text-white">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex-1">
            <div className="relative w-12 h-12 rounded-full overflow-hidden mb-2">
              <Image src="/images/hero-image-1.png" alt="logo" fill className="w-12 h-12" />
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
                  href="#"
                  className="text-muted-foreground text-xs md:text-sm hover:text-white"
                >
                  FAQs
                </Link>
                <Link
                  href="#"
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
              <h3 className="relative text-md md:text-xl text-primary font-bold mb-2">
                Chính sách
              </h3>
              <div className="w-full flex flex-col items-start justify-center gap-4">
                <Link
                  href="#"
                  className="text-muted-foreground text-xs md:text-sm hover:text-white"
                >
                  FAQs
                </Link>
                <Link
                  href="#"
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
              <h3 className="relative text-md md:text-xl text-primary font-bold mb-2">
                Chính sách
              </h3>
              <div className="w-full flex flex-col items-start justify-center gap-4">
                <Link
                  href="#"
                  className="text-muted-foreground text-xs md:text-sm hover:text-white"
                >
                  FAQs
                </Link>
                <Link
                  href="#"
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
          </div>
        </div>
        <div className="mt-4 md:mt-8">
          <p className="font-semibold">Copyright © 2025 Latata travel</p>
        </div>
      </div>
    </footer>
  );
};
