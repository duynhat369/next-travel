'use client';
import { motion } from 'framer-motion';

export const Mission = () => {
  return (
    <section className="py-12 mt-20 md:mt-24 md:py-20 bg-gradient-to-b from-secondary/15 to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Sứ mệnh của chúng tôi
          </h2>

          {/* Divider */}
          <div className="w-24 h-1 bg-primary rounded-full mb-8" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-base md:text-lg  text-foreground-secondary leading-relaxed">
              Sứ mệnh của LATATA là đưa đến cho bạn những trải nghiệm tuyệt vời nhất trên những
              chuyến đi của mình. Chúng tôi cam kết mang đến cho bạn những hành trình đầy màu sắc,
              từ những cánh đồng hoa rực rỡ đến những bãi biển xanh mát, từ những khu rừng xanh mát
              đến những thành phố sôi động. Với đội ngũ chuyên nghiệp và đam mê, chúng tôi sẽ đồng
              hành cùng bạn trong mỗi chuyến đi, giúp bạn khám phá vẻ đẹp của thiên nhiên và văn hóa
              Việt Nam. Bên cạnh đó, chúng tôi cũng cam kết bảo vệ môi trường và phát triển bền
              vững, để mỗi chuyến đi của bạn không chỉ là một trải nghiệm tuyệt vời mà còn góp phần
              vào việc bảo vệ thiên nhiên và cộng đồng địa phương. Hãy cùng chúng tôi tạo nên những
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
