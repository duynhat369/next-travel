'use client';
import { CONTACT_PAGE, TOURS_PAGE } from '@/constants';
import { motion } from 'framer-motion';
import { Compass, Phone } from 'lucide-react';
import Link from 'next/link';

export const CTA = () => {
  return (
    <section
      className="relative mb-20 md:mb-24 bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/images/hero-image-4.png')" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="relative container mx-auto px-4 py-24 z-10 max-w-3xl text-center space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-4xl md:text-5xl font-bold leading-tight"
        >
          Sẵn sàng khám phá hành trình tuyệt vời tiếp theo?
        </motion.h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground"
        >
          Hãy để chúng tôi đồng hành cùng bạn trong chuyến đi đáng nhớ nhất cuộc đời!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={`/${TOURS_PAGE}`}
              className="inline-flex items-center justify-center mt-4 bg-secondary border text-white px-3 py-2 rounded-md hover:bg-secondary/90 transition-colors"
            >
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Compass className="mr-2" />
              </motion.div>
              <span>Khám phá các tour ngay</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={`/${CONTACT_PAGE}`}
              className="inline-flex items-center justify-center mt-4 bg-foreground border text-white px-3 py-2 rounded-md hover:bg-foreground/90 transition-colors"
            >
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Phone className="mr-2" />
              </motion.div>
              <span>Nhận tư vấn miễn phí</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
