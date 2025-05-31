'use client';

import type React from 'react';

import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/currency';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowUp, ArrowUpDown, DollarSign, Gift, Package, Tag, X } from 'lucide-react';
import { useQueryState } from 'nuqs';

interface FilterBadge {
  key: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

interface Props {
  lengthResult: number;
  isLoading: boolean;
}

export function ProductHeader({ lengthResult, isLoading }: Props) {
  // URL state management
  const [sort, setSort] = useQueryState('sort', { defaultValue: '' });
  const [category, setCategory] = useQueryState('category', { defaultValue: '' });
  const [minPrice, setMinPrice] = useQueryState('minPrice', { defaultValue: '' });
  const [maxPrice, setMaxPrice] = useQueryState('maxPrice', { defaultValue: '' });
  const [hasDiscount, setHasDiscount] = useQueryState('hasDiscount', { defaultValue: '' });
  const [freeShip, setFreeShip] = useQueryState('freeShip', { defaultValue: '' });
  const [limited, setLimited] = useQueryState('limited', { defaultValue: '' });
  const [search] = useQueryState('search');

  // Sort handlers
  const handleSortChange = (newSort: string) => {
    if (sort === newSort) {
      setSort(null); // Remove sort if clicking the same option
    } else {
      setSort(newSort);
    }
  };

  // Get category label
  const getCategoryLabel = (value: string) => {
    switch (value) {
      case 'camping-gear':
        return 'Cắm trại';
      case 'souvenir':
        return 'Đồ lưu niệm';
      default:
        return value;
    }
  };

  // Generate filter badges
  const getFilterBadges = (): FilterBadge[] => {
    const badges: FilterBadge[] = [];

    // Category badge
    if (category) {
      badges.push({
        key: 'category',
        label: getCategoryLabel(category),
        value: category,
        icon: <Tag className="w-3 h-3" />,
        color: 'bg-blue-100 text-blue-800 border-blue-200',
      });
    }

    // Price range badge
    if (minPrice || maxPrice) {
      const priceLabel = `${minPrice ? formatCurrency(Number.parseInt(minPrice)) : '0'} - ${
        maxPrice ? formatCurrency(Number.parseInt(maxPrice)) : '∞'
      } VNĐ`;
      badges.push({
        key: 'price',
        label: priceLabel,
        value: 'price-range',
        icon: <DollarSign className="w-3 h-3" />,
        color: 'bg-secondary/10 text-secondary border-secondary/20',
      });
    }

    // Service badges
    if (hasDiscount === 'true') {
      badges.push({
        key: 'hasDiscount',
        label: 'Có khuyến mãi',
        value: 'true',
        icon: <Gift className="w-3 h-3" />,
        color: 'bg-red-100 text-red-800 border-red-200',
      });
    }

    if (freeShip === 'true') {
      badges.push({
        key: 'freeShip',
        label: 'Miễn phí vận chuyển',
        value: 'true',
        icon: <Package className="w-3 h-3" />,
        color: 'bg-purple-100 text-purple-800 border-purple-200',
      });
    }

    if (limited === 'true') {
      badges.push({
        key: 'limited',
        label: 'Số lượng có hạn',
        value: 'true',
        icon: <Package className="w-3 h-3" />,
        color: 'bg-primary/10 text-primary border-primary/20',
      });
    }

    return badges;
  };

  // Remove filter handlers
  const removeFilter = (filterKey: string) => {
    switch (filterKey) {
      case 'category':
        setCategory(null);
        break;
      case 'price':
        setMinPrice(null);
        setMaxPrice(null);
        break;
      case 'hasDiscount':
        setHasDiscount(null);
        break;
      case 'freeShip':
        setFreeShip(null);
        break;
      case 'limited':
        setLimited(null);
        break;
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setCategory(null);
    setMinPrice(null);
    setMaxPrice(null);
    setHasDiscount(null);
    setFreeShip(null);
    setLimited(null);
  };

  const filterBadges = getFilterBadges();

  return (
    <>
      {/* Header with Sort Options */}
      <div className="mb-6">
        {/* Sort Options */}
        <div className="flex items-center gap-2">
          {/* <span className="text-sm text-foreground-secondary font-medium">Sắp xếp:</span> */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSortChange('price_asc')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 text-sm font-medium cursor-pointer',
                sort === 'price_asc'
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 text-foreground hover:border-gray-300 hover:bg-gray-50'
              )}
            >
              <ArrowUp className="w-4 h-4" />
              Giá thấp
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSortChange('price_desc')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 text-sm font-medium cursor-pointer',
                sort === 'price_desc'
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 text-foreground hover:border-gray-300 hover:bg-gray-50'
              )}
            >
              <ArrowDown className="w-4 h-4" />
              Giá cao
            </motion.button>

            {sort && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSort(null)}
                className="p-2 text-foreground-secondary hover:text-foreground hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                title="Bỏ sắp xếp"
              >
                <ArrowUpDown className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Badges */}
      <AnimatePresence>
        {filterBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 pt-4 mb-6"
          >
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={clearAllFilters}
                className="text-xs text-foreground-secondary hover:text-foreground underline transition-colors cursor-pointer"
              >
                Xóa tất cả
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {filterBadges.map((badge) => (
                  <motion.div
                    key={badge.key}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      'inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium',
                      badge.color
                    )}
                  >
                    {badge.icon}
                    <span>{badge.label}</span>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFilter(badge.key)}
                      className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3 cursor-pointer" />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Summary */}
      {!isLoading && (filterBadges.length > 0 || search) && (
        <div className="pt-4 border-t border-gray-100 mb-6">
          <div className="text-sm text-foreground-secondary">
            Có <span className="text-primary">{lengthResult} sản phẩm</span> được tìm thấy
          </div>
        </div>
      )}
    </>
  );
}
