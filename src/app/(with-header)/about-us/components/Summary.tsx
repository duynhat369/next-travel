'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const SummarySection = () => {
  return (
    <section className="relative bg-white pt-0 pb-16 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Side - Overlapping Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative -mt-20 md:-mt-24 lg:-mt-32"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white p-3">
                <Image
                  src="https://ik.imagekit.io/driwue7iu/about-us.webp?updatedAt=1748325784101"
                  alt="Về chúng tôi img"
                  width={500}
                  height={400}
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>

              {/* Decorative Elements */}
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                whileInView={{ scale: 1, rotate: 360 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg"
              >
                <div className="w-6 h-6 bg-white rounded-full" />
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 w-8 h-8 bg-blue-500 rounded-full opacity-80 shadow-lg"
              />

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute top-1/2 -left-4 w-6 h-6 bg-yellow-400 rounded-full opacity-70 shadow-lg"
              />
            </div>
          </motion.div>

          {/* Right Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6 pt-8 lg:pt-16"
          >
            {/* Title */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <span className="text-primary font-semibold text-sm md:text-base tracking-wider uppercase mb-3 block">
                  Về chúng tôi
                </span>
                <div className="w-12 h-1 bg-primary rounded-full mb-6" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
              >
                Khám Phá Bản Đồ
                <br />
                <span className="text-primary">Hình Chữ S</span>
              </motion.h2>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="text-foreground leading-relaxed text-base md:text-lg">
                Chúng tôi là những người đam mê khám phá và chia sẻ vẻ đẹp của đất nước Việt Nam.
                Với hình dáng độc đáo như chữ S, Việt Nam sở hữu những cảnh quan thiên nhiên tuyệt
                đẹp, văn hóa đa dạng và ẩm thực phong phú.
              </p>

              <p className="text-foreground leading-relaxed text-base md:text-lg">
                Từ những ruộng bậc thang Sapa đến vịnh Hạ Long huyền thoại, từ phố cổ Hội An đến
                thành phố Hồ Chí Minh sôi động - mỗi điểm đến đều mang trong mình những câu chuyện
                độc đáo và trải nghiệm khó quên.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
