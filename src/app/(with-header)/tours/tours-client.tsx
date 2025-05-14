'use client';
import { tourApi } from '@/lib/api/tour';
import { useInfiniteQuery } from '@tanstack/react-query';
import { parseAsBoolean, parseAsString, useQueryStates } from 'nuqs';
import TourHeader from './components/tour-header';
import TourList from './components/tour-list';

export default function ToursClient() {
  const [{ search: searchTerm, sort, isHot, hasDiscount }, setQuery] = useQueryStates({
    search: parseAsString.withDefault(''),
    sort: parseAsString.withDefault('createdAt_desc'),
    isHot: parseAsBoolean.withDefault(false),
    hasDiscount: parseAsBoolean.withDefault(false),
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isLoading } =
    useInfiniteQuery({
      queryKey: ['tours-list', searchTerm, sort, isHot, hasDiscount],
      queryFn: ({ pageParam = 1 }) =>
        tourApi.getTours({
          page: pageParam,
          search: searchTerm,
          sort,
          isHot,
          hasDiscount,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.currentPage + 1 : undefined),
      staleTime: 60000, // Cache data for 1 minute
      refetchOnWindowFocus: false, // Prevent refetching when window regains focus
    });

  const tours = data?.pages.flatMap((page) => page.tours) || [];

  return (
    <main className="container mx-auto px-4 py-8 mt-28">
      <TourHeader lengthResult={tours.length} isLoading={isLoading} />
      <TourList
        tours={tours}
        status={status}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </main>
  );
}
