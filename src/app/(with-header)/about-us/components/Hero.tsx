'use client';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://ik.imagekit.io/driwue7iu/banner-about-us.webp?updatedAt=1748325348486)`,
        }}
      >
        {/* Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-4 max-w-6xl mx-auto">
        {/* Main Title */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <motion.span
              className="block mb-2"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary drop-shadow-lg">
                KHÁM PHÁ BẢN ĐỒ
              </span>
            </motion.span>

            <motion.span
              className="block mb-4"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white drop-shadow-2xl">
                HÌNH CHỮ S
              </span>
            </motion.span>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="w-32 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto mb-6 rounded-full"
            />

            <motion.span
              className="block text-xl md:text-2xl lg:text-3xl font-light tracking-wide"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <span className="text-gray-100 drop-shadow-xl">
                Bằng những trải nghiệm tuyệt vời nhất
              </span>
            </motion.span>
          </h1>

          {/* Floating Text Effects */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute -top-8 -left-8 text-white text-sm font-bold transform -rotate-12"
          >
            Discover
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
