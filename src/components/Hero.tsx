'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState('/images/hero-image-1.png');
  const images = [
    '/images/hero-image-1.png',
    '/images/hero-image-2.png',
    '/images/hero-image-3.png',
    '/images/hero-image-4.png',
  ];

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${currentImage}')` }}
        >
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-foreground text-center px-4">
        <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
          <motion.span
            className="block mb-2"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-primary drop-shadow-2xl">
              LATALA
            </span>{' '}
            <span className="text-white drop-shadow-2xl">Việt Nam</span>
          </motion.span>
          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="w-32 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto mb-6 rounded-full"
          />
          <motion.span
            className="block text-2xl md:text-3xl lg:text-4xl font-light tracking-wide"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <span className="text-xl md:text-2xl lg:text-3xl text-white/90 drop-shadow-lg font-light tracking-wide">
              Bên Bạn Mọi Cung Đường
            </span>
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-16 flex space-x-4"
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(img)}
              className={`w-4 h-4 rounded-full cursor-pointer transition-colors ${
                currentImage === img ? 'bg-foreground border border-white' : 'bg-muted-foreground'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
