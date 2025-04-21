'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Chill cùng LATATA',
    content:
      'Bạn hoàn toàn có thể chill trong xuyên suốt hành trình khám phá cùng LATATA. Ở đây chúng tôi cung cấp dịch vụ trọn gói ăn uống chỗ ngồi',
  },
  {
    title: 'Bảo vệ môi trường',
    content:
      'Ở đây chúng tôi đề cao sự gắn kết giữa các nhóm du lịch, văn hoá giao lưu và chia sẻ đam mê, nhằm phát triển bền vững nét đẹp người Việt Nam',
  },
  {
    title: 'Kết nối cộng đồng',
    content:
      'Ở đây chúng tôi đề cao sự gắn kết giữa các nhóm du lịch, văn hoá giao lưu và chia sẻ đam mê, nhằm phát triển bền vững nét đẹp người Việt Nam',
  },
  {
    title: 'Bảo tồn văn hoá',
    content:
      'Ở đây chúng tôi đề cao sự gắn kết giữa các nhóm du lịch, văn hoá giao lưu và chia sẻ đam mê, nhằm phát triển bền vững nét đẹp người Việt Nam',
  },
  {
    title: 'Trải nghiệm đa dạng',
    content:
      'Ở đây chúng tôi đề cao sự gắn kết giữa các nhóm du lịch, văn hoá giao lưu và chia sẻ đam mê, nhằm phát triển bền vững nét đẹp người Việt Nam',
  },
];

export const Timeline = () => {
  return (
    <section className="container relative mx-auto my-20 md:my-24 px-8 md:px-16">
      <motion.h2
        className="mb-8 md:mb-16 text-center text-4xl md:text-5xl font-bold text-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Hỗ trợ cá nhân hoá chuyến đi
      </motion.h2>
      <div className="flex flex-col relative">
        {features.map((item, index) => {
          const isRight = index % 2 === 1;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                'relative flex flex-row items-center before:content-[""] before:absolute md:before:left-1/2 before:transform before:-translate-x-1/2 before:top-0 before:bottom-0 before:border-l-2 before:border-muted',
                isRight ? 'md:flex-row-reverse' : ''
              )}
            >
              <div className="w-full md:w-1/2 py-4 md:py-2 px-8">
                <div className="bg-transparent shadow-none p-0">
                  <div className="p-0">
                    <h3 className="font-bold text-2xl mb-2">{item.title}</h3>
                    <p className="text-base text-foreground whitespace-pre-line">{item.content}</p>
                  </div>
                </div>
              </div>
              <div className="relative h-full"></div>
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-foreground border-4 border-muted-foreground"></div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
