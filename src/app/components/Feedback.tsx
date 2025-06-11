'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ABOUT_US_PAGE } from '@/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface User {
  id: number;
  role: string;
  username: string;
  avatar: string;
  description: string;
}

const USERS: User[] = [
  {
    id: 1,
    role: 'Dẫn tour',
    username: 'Trần Mỹ Lệ',
    avatar: 'https://ik.imagekit.io/driwue7iu/tour-thumb.webp?updatedAt=1748326335537',
    description:
      'Bạn hoàn toàn có thể chill trong xuyên suốt hành trình khám phá cùng LATATA. Ở đây chúng tôi cung cấp dịch vụ trọn gói ăn uống chỗ ngồi',
  },
  {
    id: 2,
    role: 'Khách hàng',
    username: 'Anh Hai Lúa',
    avatar: 'https://ik.imagekit.io/driwue7iu/tour-guide.webp?updatedAt=1748324193902',
    description:
      'Ở đây chúng tôi đề cao sự gắn kết giữa các nhóm du lịch, văn hoá giao lưu và chia sẻ đam mê, nhằm phát triển bền vững nét đẹp người Việt Nam, Bạn hoàn toàn có thể chill trong xuyên suốt hành trình khám phá cùng LATATA. Ở đây chúng tôi cung cấp dịch vụ trọn gói ăn uống chỗ ngồi',
  },
  {
    id: 3,
    role: 'Khách hàng',
    username: 'Nguyễn Duy Nhật',
    avatar: 'https://ik.imagekit.io/driwue7iu/banner-about-us.webp?updatedAt=1748325348486',
    description:
      'Tôi đã có những trải nghiệm tuyệt vời với LATATA. Họ đã giúp tôi khám phá những địa điểm thú vị và cung cấp dịch vụ chuyên nghiệp.',
  },
  {
    id: 4,
    role: 'Dẫn tour',
    username: 'MR Quang Vũ',
    avatar: 'https://ik.imagekit.io/driwue7iu/avt.webp?updatedAt=1748325940573',
    description:
      'Dẫn tour là một công việc thú vị và đầy thử thách. Tôi rất vui khi được chia sẻ những kiến thức và kinh nghiệm của mình với khách hàng.',
  },
  {
    id: 5,
    role: 'Khách hàng',
    username: 'Chị Bảy',
    avatar: 'https://ik.imagekit.io/driwue7iu/tour-guide.webp?updatedAt=1748324193902',
    description:
      'Đã đi tour với LATATA và tôi rất hài lòng với dịch vụ của họ. Họ đã giúp tôi có những trải nghiệm đáng nhớ và thú vị.',
  },
  {
    id: 6,
    role: 'Khách hàng',
    username: 'Chị Thảo Anh',
    avatar: 'https://ik.imagekit.io/driwue7iu/banner-about-us.webp?updatedAt=1748325348486',
    description:
      'Sự chuyên nghiệp và tận tâm của đội ngũ LATATA đã làm cho chuyến đi của tôi trở nên đặc biệt. Tôi sẽ giới thiệu họ cho bạn bè và gia đình.',
  },
  {
    id: 7,
    role: 'Khách hàng',
    username: 'Em Tuấn Hải Phòng',
    avatar: 'https://ik.imagekit.io/driwue7iu/tour-thumb.webp?updatedAt=1748326335537',
    description:
      'Không chỉ là một chuyến đi, mà là một hành trình khám phá văn hóa và con người. LATATA đã mang đến cho tôi những trải nghiệm tuyệt vời.',
  },
  {
    id: 8,
    role: 'Khách hàng',
    username: 'Anh Dương Đức',
    avatar: 'https://ik.imagekit.io/driwue7iu/tour-thumb-2.webp?updatedAt=1748326535457',
    description:
      'Tôi muốn cảm ơn LATATA vì đã mang đến cho tôi một chuyến đi tuyệt vời. Họ đã giúp tôi khám phá những địa điểm thú vị và cung cấp dịch vụ chuyên nghiệp.',
  },
  {
    id: 9,
    role: 'Người dẫn tour',
    username: 'Phan Long Nhật',
    avatar: 'https://ik.imagekit.io/driwue7iu/about-us.webp?updatedAt=1748325784101',
    description:
      'Khách hàng của tôi đã có những trải nghiệm tuyệt vời với LATATA. Họ đã giúp tôi khám phá những địa điểm thú vị và cung cấp dịch vụ chuyên nghiệp.',
  },
  {
    id: 10,
    role: 'Khách hàng',
    username: 'Đặng Quỳnh Anh',
    avatar: '/default-avatar.png',
    description:
      'Thật tuyệt vời khi được trải nghiệm dịch vụ của LATATA. Họ đã giúp tôi có những trải nghiệm đáng nhớ và thú vị trong chuyến đi của mình.',
  },
];

export const Feedback = () => {
  const [selectedUser, setSelectedUser] = useState(USERS[0]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 6; // Number of avatars visible at once

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? USERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev === USERS.length - 1 ? 0 : prev + 1));
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const visibleUsers = Array.from({ length: itemsToShow }, (_, i) => {
    const index = (startIndex + i) % USERS.length;
    return USERS[index];
  });

  return (
    <section className="container mx-auto my-20 md:my-24 px-4">
      <motion.div
        className="text-center mb-8 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2
          className="mb-4 text-4xl md:text-5xl font-bold text-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Khách hàng nói gì về LATATA
        </motion.h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
        <motion.p
          className="text-lg text-foreground-secondary mt-4 md:px-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Chúng tôi luôn ghi nhận đóng góp và chia sẻ của khách hàng trong quá trình làm việc với
          nhau. <br /> Chúng tôi luôn lắng nghe và cải thiện dịch vụ của mình để phục vụ khách hàng
          tốt nhất
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            href={`/${ABOUT_US_PAGE}`}
            className="inline-flex items-center justify-center mt-4 bg-foreground text-white px-3 py-2 rounded-md hover:bg-foreground/90 transition-colors"
          >
            <span>Về chúng tôi</span>
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <ArrowRight className="ml-2" />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      <div className="w-full flex flex-col">
        <div className="relative mb-8">
          <div className="flex items-center justify-center mb-2">
            <button
              onClick={handlePrev}
              className="flex items-center justify-center mr-4 cursor-pointer"
            >
              <ChevronLeft size={40} />
            </button>

            <div className="flex items-center justify-center gap-4 overflow-hidden">
              {visibleUsers.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0.6, scale: 0.8 }}
                  animate={{
                    opacity: selectedUser.id === user.id ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1 }}
                  onClick={() => handleUserSelect(user)}
                  className="cursor-pointer"
                >
                  <Avatar
                    className={`h-16 w-16 border-2 ${
                      selectedUser.id === user.id ? 'border-primary' : 'border-muted'
                    }`}
                  >
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback>
                      <User className="h-8 w-8 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="rounded-full flex items-center justify-center ml-4 cursor-pointer"
            >
              <ChevronRight size={40} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedUser.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-4 items-center mt-4 text-center"
          >
            <blockquote className="text-base italic leading-relaxed md:max-w-[500px]">
              &quot;{selectedUser.description}&quot;
            </blockquote>
            <div className="relative w-full max-w-[300px] max-h-[300px] aspect-square">
              <Image
                src={selectedUser.avatar}
                alt={selectedUser.username}
                fill
                className="rounded-2xl object-cover"
              />
            </div>
            <div className="w-full">
              <h3 className="text-xl font-semibold mb-1">{selectedUser.username}</h3>
              <p className="text-sm text-primary font-bold mb-1 leading-relaxed">
                {selectedUser.role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
