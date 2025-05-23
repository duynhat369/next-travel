import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tour } from '@/types/tour.types';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  tour?: Tour;
}
export default function Gallery({ tour }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const nextImage = () => {
    if (tour?.gallery) {
      setCurrentImageIndex((prev) => (prev + 1) % tour.gallery.length);
    }
  };

  const prevImage = () => {
    if (tour?.gallery) {
      setCurrentImageIndex((prev) => (prev - 1 + tour.gallery.length) % tour.gallery.length);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-start gap-4">
        <h3 className="text-2xl font-semibold tracking-tight">Hình ảnh Tour</h3>
        <Badge variant="outline" className="px-3">
          {tour?.gallery?.length || 0} ảnh
        </Badge>
      </div>

      {tour?.gallery && tour.gallery.length > 0 ? (
        <>
          {/* Main large image preview */}
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image
              src={tour.gallery[currentImageIndex]}
              alt="Tour image preview"
              fill
              priority
              className="object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 text-foreground cursor-pointer"
                onClick={() => setShowLightbox(true)}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
            {tour.gallery.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full opacity-70 hover:opacity-100 text-foreground cursor-pointer"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full opacity-70 hover:opacity-100 text-foreground cursor-pointer"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {/* Thumbnail gallery */}
          {/* <ScrollArea className="w-full whitespace-nowrap pb-4">
              <div className="flex gap-2">
                {tour.gallery.map((img, idx) => (
                  <div
                    key={`${img}-${idx}`}
                    className={cn(
                      'relative aspect-square w-20 flex-shrink-0 cursor-pointer rounded-md overflow-hidden transition-all hover:opacity-90',
                      currentImageIndex === idx ? 'ring-2 ring-primary ring-offset-2' : ''
                    )}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <Image src={img} alt={`Tour image ${idx + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea> */}

          {/* Lightbox Modal */}
          {showLightbox && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
              <div className="relative w-full max-w-6xl aspect-video">
                <Image
                  src={tour.gallery[currentImageIndex]}
                  alt="Tour image full size"
                  fill
                  className="object-contain"
                />
              </div>
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 rounded-full cursor-pointer"
                onClick={() => setShowLightbox(false)}
              >
                <X className="h-5 w-5" />
              </Button>
              {tour.gallery.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full cursor-pointer"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full cursor-pointer"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full">
                <p className="text-white text-sm">
                  {currentImageIndex + 1} / {tour.gallery.length}
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="aspect-video rounded-xl border border-dashed flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Chưa có hình ảnh cho Tour này</p>
        </div>
      )}
    </div>
  );
}
