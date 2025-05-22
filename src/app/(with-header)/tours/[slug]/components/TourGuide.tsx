import { Tour } from '@/types/tour.types';
import Image from 'next/image';

interface Props {
  tour?: Tour;
}
export default function TourGuide({ tour }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold tracking-tight">Người dẫn Tour</h3>
      {tour?.guides && tour.guides.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tour.guides.map((guide, idx) => (
            <div key={idx} className="overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <Image src={guide.avatar} alt={guide.name} fill className="object-cover" />
              </div>
              <span className="font-medium">{guide.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Thông tin của người dẫn Tour đang được cập nhật
        </p>
      )}
    </div>
  );
}
