'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  maxVisiblePages?: number;
}

export function Pagination({
  pagination,
  onPageChange,
  showInfo = true,
  maxVisiblePages = 5,
}: PaginationProps) {
  const { currentPage, totalPages, total, limit, hasNext, hasPrev } = pagination;

  // Generate page numbers to show
  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // Adjust if we're near the beginning or end
    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages, maxVisiblePages);
    }
    if (currentPage > totalPages - halfVisible) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('ellipsis');
      }
    }

    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('ellipsis');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Pagination Controls */}
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <motion.button
          whileHover={{ scale: hasPrev ? 1.05 : 1 }}
          whileTap={{ scale: hasPrev ? 0.95 : 1 }}
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={!hasPrev}
          className={cn(
            'flex items-center justify-center w-10 h-10 rounded-lg border transition-colors',
            hasPrev
              ? 'border-gray-300 text-foreground hover:bg-gray-50 hover:border-foreground-secondary'
              : 'border-gray-200 text-foreground-secondary cursor-not-allowed'
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="sr-only">Previous page</span>
        </motion.button>

        {/* Page Numbers */}
        {visiblePages.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <div key={`ellipsis-${index}`} className="flex items-center justify-center w-10 h-10">
                <MoreHorizontal className="w-4 h-4 text-foreground-secondary" />
              </div>
            );
          }

          const isCurrentPage = page === currentPage;

          return (
            <motion.button
              key={page}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageClick(page)}
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-lg border font-medium transition-colors',
                isCurrentPage
                  ? 'border-primary bg-primary text-white shadow-sm'
                  : 'border-gray-300 text-foreground hover:bg-gray-50 hover:border-foreground-secondary'
              )}
            >
              {page}
            </motion.button>
          );
        })}

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: hasNext ? 1.05 : 1 }}
          whileTap={{ scale: hasNext ? 0.95 : 1 }}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={!hasNext}
          className={cn(
            'flex items-center justify-center w-10 h-10 rounded-lg border transition-colors',
            hasNext
              ? 'border-gray-300 text-foreground hover:bg-gray-50 hover:border-foreground-secondary'
              : 'border-gray-200 text-foreground-secondary cursor-not-allowed'
          )}
        >
          <ChevronRight className="w-4 h-4" />
          <span className="sr-only">Next page</span>
        </motion.button>
      </div>
    </div>
  );
}
