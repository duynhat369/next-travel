'use client';
import { motion } from 'framer-motion';
import type React from 'react';

import { Leaf, MapPin, Snowflake, Sun } from 'lucide-react';

interface SeasonData {
  id: number;
  season: string;
  seasonSub: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
}

const seasonsData: SeasonData[] = [
  {
    id: 1,
    season: 'LATATA Xuân',
    seasonSub: 'Khởi đầu mới',
    description:
      'Cùng với LATATA khám phá mùa Xuân Việt Nam với những chuyến đi đầy màu sắc và thú vị. Từ những cánh đồng hoa rực rỡ đến những khu rừng xanh mát, bạn sẽ được trải nghiệm vẻ đẹp của thiên nhiên và văn hóa Việt Nam trong mùa Xuân. Hãy cùng chúng tôi khám phá những điểm đến tuyệt vời và tạo nên những kỷ niệm đáng nhớ trong hành trình của bạn.',
    icon: <Leaf className="w-6 h-6" />,
    color: 'text-secondary',
    bgGradient: 'from-secondary/20 to-emerald-50',
  },
  {
    id: 2,
    season: 'LATATA Hạ',
    seasonSub: 'Hành trình bất tận',
    description:
      'Hành trình khám phá bất tận bắt đầu từ những ngày cuối mùa xuân và đầu mùa hạ. Từ đây bạn sẽ được trải nghiệm những chuyến đi đầy thú vị, những khoảnh khắc đáng nhớ và những kỷ niệm không thể nào quên. Với LATATA, bạn sẽ được trải nghiệm những chuyến đi đầy màu sắc và thú vị, từ những bãi biển xanh mát đến những cánh đồng hoa rực rỡ.',
    icon: <Sun className="w-6 h-6" />,
    color: 'text-primary',
    bgGradient: 'from-primary/15 to-yellow-50',
  },
  {
    id: 3,
    season: 'LATATA Thu',
    seasonSub: 'Tận hưởng',
    description:
      'Còn gì hơn một mùa thu lãng mạn? Câu trả lời chính xác là tận hưởng mùa Thu cùng với LATATA, nơi bạn có thể trải nghiệm những chuyến đi đầy thú vị và những khoảnh khắc đáng nhớ. Với đội ngũ chuyên nghiệp, chúng tôi cam kết mang đến cho bạn những trải nghiệm tuyệt vời nhất trong mùa Thu này.',
    icon: <MapPin className="w-6 h-6" />,
    color: 'text-amber-600',
    bgGradient: 'from-amber-50 to-orange-50',
  },
  {
    id: 4,
    season: 'LATATA Đông',
    seasonSub: 'Cảm nhận',
    description:
      'Mùa Đông là thời điểm tuyệt vời để cảm nhận vẻ đẹp của thiên nhiên và văn hóa Việt Nam. Với LATATA, bạn sẽ được trải nghiệm những chuyến đi đầy thú vị và những khoảnh khắc đáng nhớ trong mùa Đông này. Từ những cánh đồng hoa rực rỡ đến những khu rừng xanh mát, bạn sẽ được khám phá vẻ đẹp của thiên nhiên và văn hóa Việt Nam trong mùa Đông.',
    icon: <Snowflake className="w-6 h-6" />,
    color: 'text-blue-600',
    bgGradient: 'from-blue-50 to-cyan-50',
  },
];

export const Seasons = () => {
  return (
    <section className=" mt-20 md:mt-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-left mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trải nghiệm trọn vẹn 4 mùa
          </h2>
          <div className="w-24 h-1 bg-primary rounded-full mb-6" />
          <p className="text-lg text-foreground-secondary max-w-2xl">
            Khám phá vẻ đẹp Việt Nam qua từng mùa với những trải nghiệm độc đáo và đáng nhớ
          </p>
        </motion.div>

        {/* Seasons Grid */}
        <div className="space-y-8">
          {seasonsData.map((season, index) => (
            <motion.div
              key={season.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`bg-gradient-to-r ${season.bgGradient} rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Season Name & Icon */}
                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`p-3 rounded-full bg-white shadow-md ${season.color}`}>
                    {season.icon}
                  </div>
                  <div>
                    <h3 className={`text-2xl md:text-3xl font-bold ${season.color}`}>
                      {season.season}
                    </h3>
                    <p className="text-foreground-secondary text-sm font-medium uppercase tracking-wider">
                      {season.seasonSub}
                    </p>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  className="lg:col-span-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p className="text-foreground-secondary text-base md:text-lg leading-relaxed text-left">
                    {season.description}
                  </p>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-5">
                <div className={`text-8xl ${season.color}`}>{season.icon}</div>
              </div>

              {/* Subtle Pattern Overlay */}
              <div className="absolute inset-0 opacity-5">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `radial-gradient(circle at 20% 20%, currentColor 2px, transparent 2px),
                             radial-gradient(circle at 80% 80%, currentColor 2px, transparent 2px)`,
                    backgroundSize: '30px 30px',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
