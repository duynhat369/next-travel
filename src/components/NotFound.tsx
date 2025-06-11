'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary/30 text-center px-4">
      <motion.div
        initial={{ rotate: -10, scale: 0.8 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="text-[120px] sm:text-[160px] font-extrabold text-primary drop-shadow-xl"
      >
        🐥 404
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl sm:text-3xl font-semibold text-foreground"
      >
        Oops! Trang này đã bay mất rồi
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-foreground-secondary text-sm sm:text-base"
      >
        Có thể bạn vừa gõ nhầm, hoặc con gà lập trình đã xóa nó
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <Link
          href="/"
          className="bg-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-primary/80 transition"
        >
          🏠 Quay về trang chủ
        </Link>
      </motion.div>
    </div>
  );
};
