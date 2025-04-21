'use client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const WhatMakesTripGreat = () => {
  return (
    <section className="bg-gradient-to-b md:bg-gradient-to-br from-white to-green-100 py-12 mt-20 md:mt-24 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="w-full md:w-2/5 space-y-6 text-center md:text-start"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="text-secondary">Điều quan trọng</span> để chuyến đi thành công
            </motion.h2>

            <motion.p
              className="text-foreground-secondary text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Ngoài những trải nghiệm tuyệt vời, các bức hình đẹp, những món ăn ngon, thì điều quan
              trọng nhất là sự kết nối giữa mọi người với nhau. Hãy cùng chúng tôi tạo nên những kỷ
              niệm đáng nhớ trong chuyến đi của bạn!
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Button
                variant="secondary"
                className="text-white rounded-2xl px-4 py-2 shadow-md transition-colors cursor-pointer hover:bg-secondary/90"
              >
                Đọc thêm
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <Link href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
                <Instagram size={20} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            className="w-full md:w-3/5 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="relative w-full aspect-square md:aspect-[4/3]">
              <Image
                src="/images/trip-great.png"
                alt="Wellness Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>

            <motion.div
              className="absolute -top-6 right-1/4 w-16 h-16 bg-emerald-300 rounded-full opacity-80"
              whileInView={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
            <motion.div
              className="absolute -bottom-2 left-1/4 w-12 h-12 bg-emerald-400 rounded-full opacity-60"
              whileInView={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 1,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
