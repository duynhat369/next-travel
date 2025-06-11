'use client';

import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

export const ContactInfo = () => {
  return (
    <section className="relative bg-white pt-0 pb-16 md:pb-24 overflow-hidden">
      <div className="relative container mx-auto px-4 py-8 mt-12 md:mt-20 lg:mt-28">
        {/* Decorative elements - Responsive positioning */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute sm:top-20 sm:left-15 text-purple-300 text-4xl sm:text-5xl font-bold hidden sm:block"
        >
          +
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute sm:top-30 sm:right-10 text-pink-300 text-4xl sm:text-5xl font-bold hidden sm:block"
        >
          ⌒
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute sm:bottom-0 sm:left-20 text-purple-200 text-4xl sm:text-5xl font-bold hidden sm:block"
        >
          ⌒
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-[10%] right-[8%] sm:bottom-0 sm:right-20 text-primary/50 text-4xl sm:text-5xl font-bold hidden sm:block"
        >
          ⌒
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute sm:top-30 sm:left-30 text-primary/50 text-2xl sm:text-3xl font-bold hidden sm:block"
        >
          +
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="absolute bottom-[25%] right-[15%] sm:bottom-40 sm:right-40 text-secondary/60 text-2xl sm:text-3xl font-bold hidden sm:block"
        >
          +
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute bottom-0 left-2 text-primary/50 text-3xl font-bold sm:hidden"
        >
          +
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-0 right-2 text-secondary/60 text-3xl font-bold sm:hidden"
        >
          ⌒
        </motion.div>

        {/* Main content - Improved responsive spacing */}
        <div className="max-w-3xl mx-auto text-center relative z-10 px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6"
          >
            Hãy liên hệ với chúng tôi
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-foreground-secondary mb-8 sm:mb-12 max-w-xl mx-auto"
          >
            Thông tin liên hệ của chúng tôi luôn sẵn sàng để hỗ trợ bạn. Nếu bạn có bất kỳ câu hỏi
            nào, hãy liên hệ với chúng tôi qua số điện thoại hoặc email bên dưới.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-10">
            <motion.a
              href="tel:0815567712"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-2 sm:gap-3 text-foreground-secondary hover:text-primary transition-colors p-2 rounded-md hover:bg-primary/5"
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-base sm:text-lg">0815567712</span>
            </motion.a>

            <motion.a
              href="mailto:duynhat719@gmail.com"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-2 sm:gap-3 text-foreground-secondary hover:text-primary transition-colors p-2 rounded-md hover:bg-primary/5"
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-base sm:text-lg break-all">duynhat719@gmail.com</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};
