'use client';
import { Input } from '@/components/ui/input';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
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
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 mt-[-80px] leading-18"
          style={{ textShadow: '0px 0 2px var(--muted)' }}
        >
          <span className="text-primary">LATALA</span> Việt Nam <br /> Bên Bạn Mọi Cung Đường
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center w-full max-w-[800px] mb-16 py-2 px-4 bg-white rounded-full shadow-sm"
        >
          <Search size={24} className="text-primary" />
          <Input
            type="text"
            placeholder="Bạn đang quan tâm điều gì?"
            className="flex-1 border-none shadow-none placeholder:text-muted-foreground focus-visible:ring-0"
          />
        </motion.div>

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
