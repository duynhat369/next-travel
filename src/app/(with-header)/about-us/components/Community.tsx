'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const Community = () => {
  return (
    <section className="container mx-auto my-20 md:my-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Tham gia cộng đồng Camping
        </h2>

        {/* Divider */}
        <div className="w-24 h-1 bg-primary rounded-full mb-8" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-base md:text-lg text-foreground leading-relaxed">
            Chúng tôi không chỉ là một nhóm người yêu thích cắm trại, mà còn là một cộng đồng đam mê
            khám phá thiên nhiên, chia sẻ những khoảnh khắc đáng nhớ và hỗ trợ lẫn nhau trong những
            chuyến phiêu lưu. Tại đây, bạn sẽ tìm thấy những người bạn cùng chung sở thích, cùng
            nhau tạo nên những kỷ niệm đẹp và học hỏi từ nhau. <br /> <br />
            Tham gia cộng đồng của chúng tôi để nhận thông báo về thời gian tổ chức Team Building
            của cộng đồng yêu thích cắm trại ngoài trời, bạn sẽ được kết nối với những người có cùng
            đam mê.
          </p>

          {/* Join Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="pt-4"
          >
            <Link
              href={'https://www.facebook.com/duyNhatDeveloper/'}
              target="_blank"
              className="inline-flex items-center justify-center mt-4 bg-foreground text-white px-3 py-2 rounded-md hover:bg-foreground/90 transition-colors"
            >
              <span>Tham gia ngay</span>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="ml-2" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
