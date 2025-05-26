'use client';
import { motion } from 'framer-motion';
import type React from 'react';

import Image from 'next/image';

interface Equipment {
  icon: React.ReactNode;
  name: string;
  description: string;
  color: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  avatar: string;
  experience: string;
  achievements: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Nguyễn Duy Nhật',
    role: 'Siêu dẫn đoàn',
    description: 'Chuyên gia dẫn đoàn với 10 năm kinh nghiệm',
    avatar: '/images/about-us-2.png',
    experience: '10 năm',
    achievements: ['15+ tour hàng năm', '100+ khách hàng năm', 'Chuyên gia sinh tồn'],
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    role: 'Người chụp ảnh',
    description:
      'Chuyên gia chụp ảnh thiên nhiên và du lịch. Là đầu bếp của mỗi chuyến camping ngoài trời',
    avatar: '/images/about-us-2.png',
    experience: '5 years',
    achievements: ['10k+ Ảnh đẹp', 'Bắt trọn khoảng khắc', 'Phụ trách nấu ăn'],
  },
  {
    id: 3,
    name: 'Lê Minh Cường',
    role: 'Dẫn đoàn leo núi',
    description: 'Chuyên gia cắm trại, leo núi và sinh tồn ngoài trời. Phụ trách các tour leo núi',
    avatar: '/images/about-us-2.png',
    experience: '5 năm',
    achievements: ['Chứng chỉ camping quốc tế', '100+ Bãi cắm', 'Chinh phục 20+ đỉnh núi'],
  },
  {
    id: 4,
    name: 'Phạm Thu Dung',
    role: 'Hướng dẫn lặn biển',
    description: 'Chuyên gia du lịch biển, hướng dẫn lặn biển chuyên nghiệp',
    avatar: '/images/about-us-2.png',
    experience: '5 năm',
    achievements: ['Nữ hoàng lặn biển', '500+ Lần lặn', 'Chứng chỉ lặn quốc tế'],
  },
  {
    id: 5,
    name: 'Nguyễn Hải Long',
    role: 'Dẫn tour chuyên nghiệp',
    description:
      'Chuyên gia dẫn đoàn với 6 năm kinh nghiệm. Phụ trách các tour sinh tồn và khám phá',
    avatar: '/images/about-us-2.png',
    experience: '6 năm',
    achievements: ['10+ tour hàng năm', '100+ khách hàng năm', 'Chuyên gia sinh tồn'],
  },
  {
    id: 6,
    name: 'Lý Như Anh',
    role: 'Hỗ trợ dẫn tour',
    description:
      'Hỗ trợ dẫn đoàn và chụp ảnh. Là đầu bếp của mỗi chuyến camping ngoài trời. Luôn vui vẻ và yêu đời',
    avatar: '/images/about-us-2.png',
    experience: '3 years',
    achievements: ['Được khách hàng yêu quý', 'Bắt trọn khoảng khắc', 'Phụ trách nấu ăn'],
  },
  {
    id: 7,
    name: 'Trần Hùng',
    role: 'Biên kịch',
    description: 'Lên kịch bản cho các Tour du lịch private trọn gói',
    avatar: '/images/about-us-2.png',
    experience: '6 năm',
    achievements: ['Tinh tế', 'Du lịch sinh thái', 'Thạc sĩ ngành du lịch'],
  },
  {
    id: 8,
    name: 'Phạm Hoàng',
    role: 'Dẫn tour xuyên Việt',
    description:
      'Người có 10 năm kinh nghiệm dẫn tour xuyên Việt. Chuyên gia du lịch đường dài bằng xe máy',
    avatar: '/images/about-us-2.png',
    experience: '10 năm',
    achievements: ['Vua đường dài', '30+ Lần xuyên việt', 'Biết sửa xe máy'],
  },
];

export const Team = () => {
  return (
    <section className="py-12 mt-20 md:mt-24 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-secondary/30">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Đội Ngũ nhà </span>
            <span className="text-primary">LATATA</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            Các thành viên nổi bật của chúng tôi là những người đam mê du lịch, yêu thiên nhiên và
            luôn sẵn sàng mang đến những trải nghiệm tuyệt vời nhất cho bạn.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Main Card */}
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                {/* Avatar Section */}
                <div className="relative p-6 pb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-xl"
                  >
                    <Image
                      src={member.avatar || '/placeholder.svg'}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Experience Badge */}
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                    {member.experience}
                  </div>
                </div>

                {/* Member Info */}
                <div className="px-6 pb-4">
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-2">{member.role}</p>
                  <p className="text-foreground-secondary text-sm mb-4">{member.description}</p>
                </div>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-gray-50 px-6"
                >
                  <div className="py-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Nổi bật:</h4>
                    <ul className="space-y-1">
                      {member.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-foreground-secondary flex items-center"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
