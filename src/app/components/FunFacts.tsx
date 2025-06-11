'use client';

import { Card } from '@/components/ui/card';
import { useCountUp } from '@/hooks';
import { motion } from 'framer-motion';
import { FlagTriangleRight, Heart, Plane, Users } from 'lucide-react';
import { useRef } from 'react';

const FACTS = [
  { icon: <Plane className="w-8 h-8 text-white" />, value: 35, label: 'Tour hằng năm' },
  { icon: <Users className="w-8 h-8 text-white" />, value: 200, label: 'Khách hàng' },
  { icon: <Heart className="w-8 h-8 text-white" />, value: 100, label: 'Trách nhiệm', suffix: '%' },
  { icon: <FlagTriangleRight className="w-8 h-8 text-white" />, value: 20, label: 'Địa điểm' },
];

const FactCard = ({
  value,
  label,
  icon,
  suffix = '+',
}: {
  value: number;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
}) => {
  const count = useCountUp(value, true);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <Card className="flex flex-col items-center text-center p-6 shadow-md rounded-2xl border-none bg-foreground">
        <div className="text-2xl font-bold text-white">
          {count}
          {suffix}
        </div>
        <div className="text-base text-white">{label}</div>
        <div>{icon}</div>
      </Card>
    </motion.div>
  );
};

export const FunFacts = () => {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      className="py-24 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/section-background.png')" }}
    >
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8 md:mb-16">
          <motion.h2
            className="mb-4 text-4xl md:text-5xl font-bold text-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Những điều thú vị LATATA
          </motion.h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <motion.p
            className="text-lg text-foreground-secondary mt-4 md:px-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            LATATA hoạt động không ngừng nghỉ và nổ lực hết mình để đưa dịch vụ du lịch tới khách
            hàng lên tầm cao mới. <br /> Chúng tôi phát triển mạng lưới du lịch và gắn bó dài lâu
            với khách hàng
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {FACTS.map((item, index) => (
            <FactCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};
