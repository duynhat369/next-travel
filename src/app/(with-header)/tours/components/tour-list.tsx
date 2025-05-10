'use client';

import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { tourApi, TourSortBy } from '@/lib/api/tour';
import { Tour } from '@/types/tour.types';
import { formatCurrency } from '@/utils/currency';
import { useInfiniteQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { parseAsBoolean, parseAsString, useQueryStates } from 'nuqs';

import { useEffect, useRef } from 'react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
    },
  },
};

export default function TourList() {
  const [{ search: searchTerm, sortBy, sortOrder, isHot, hasDiscount }, setQuery] = useQueryStates({
    search: parseAsString.withDefault(''),
    sortBy: parseAsString.withDefault(TourSortBy.CREATED_AT),
    sortOrder: parseAsString.withDefault('desc'),
    isHot: parseAsBoolean.withDefault(false),
    hasDiscount: parseAsBoolean.withDefault(false),
  });
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['tours', searchTerm, sortBy, sortOrder, isHot, hasDiscount],
    queryFn: ({ pageParam = 1 }) =>
      tourApi.getTours({
        page: pageParam,
        search: searchTerm,
        sortBy: sortBy as TourSortBy,
        sortOrder,
        isHot,
        hasDiscount,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.currentPage + 1 : undefined),
    staleTime: 60000, // Cache data for 1 minute
    refetchOnWindowFocus: false, // Prevent refetching when window regains focus
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  const tours = data?.pages.flatMap((page) => page.tours) || [];

  if (status === 'pending') {
    return <TourListSkeleton />;
  }

  if (status === 'error') {
    return <div className="text-center py-10">Đã xảy ra lỗi khi tải dữ liệu.</div>;
  }

  if (tours.length === 0) {
    return <div className="text-center py-10">Không có tour phù hợp.</div>;
  }

  return (
    <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="show">
      {tours.map((tour) => (
        <motion.div key={tour._id} variants={itemVariants} whileHover={{ scale: 1.01 }}>
          <TourCard tour={tour} />
        </motion.div>
      ))}

      <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && (
          <div className="col-span-full flex justify-center p-4">
            <div className="w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TourCard({ tour }: { tour: Tour }) {
  const originalPrice = tour.price;
  const discountedPrice = tour.discountPercentage
    ? tour.price * (1 - tour.discountPercentage / 100)
    : null;

  return (
    <Link href={`/tours/${tour.slug}`} className="block group">
      <div className="flex flex-col md:flex-row gap-6 hover:bg-background p-4 rounded-lg transition-colors">
        <div className="flex-1">
          <motion.h2
            className="text-xl font-bold uppercase mb-4"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {tour.title}
          </motion.h2>

          <motion.p
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {tour.description}
          </motion.p>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <motion.span
                className="inline-block px-3 py-1 border border-foreground rounded-full font-medium group-hover:bg-foreground group-hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {formatCurrency(discountedPrice || originalPrice)} VNĐ
              </motion.span>

              {tour.discountPercentage ? (
                <Badge className="absolute -top-4 -right-4 bg-primary text-white font-bold">
                  -{tour.discountPercentage}%
                </Badge>
              ) : null}
            </div>
            {tour.discountPercentage ? (
              <motion.span
                className="inline-block ml-2 text-muted-foreground line-through"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.4 }}
              >
                {formatCurrency(originalPrice)} VNĐ
              </motion.span>
            ) : null}
          </motion.div>
        </div>

        <motion.div
          className="w-full md:w-100 h-65 relative rounded-lg overflow-hidden"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={tour.thumbnail || '/placeholder.svg'}
            alt={tour.title}
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </Link>
  );
}

function TourListSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col md:flex-row gap-6 p-4">
          <div className="flex-1">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="w-full md:w-100 h-65 rounded-lg" />
        </div>
      ))}
    </div>
  );
}
