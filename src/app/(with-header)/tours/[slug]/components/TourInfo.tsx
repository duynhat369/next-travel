import { Tour } from '@/types/tour.types';
import { motion } from 'framer-motion';
import Gallery from './Gallery';
import TourGuide from './TourGuide';

interface Props {
  tour?: Tour;
}
export default function TourInfo({ tour }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="col-span-2 space-y-8"
    >
      <Gallery tour={tour} />
      <p className="text-lg text-foreground leading-relaxed">
        {tour?.description || 'Không có thông tin mô tả cho chuyến đi này.'}
      </p>
      <TourGuide tour={tour} />

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold tracking-tight">Dụng cụ cần thiết</h3>
        {tour?.whatToBring && tour.whatToBring.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {tour.whatToBring.map((item, idx) => (
              <li key={idx} className="text-foreground">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Thông tin đang được cập nhật</p>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold tracking-tight">Lịch trình chi tiết</h3>
        {tour?.itinerary ? (
          <div className="">{tour?.itinerary}</div>
        ) : (
          <p className="text-sm text-muted-foreground">Thông tin đang được cập nhật</p>
        )}
      </div>
    </motion.div>
  );
}
