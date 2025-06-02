'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, DollarSign, Filter, Gift, Tag, X } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

interface PriceRange {
  min: number;
  max: number;
}

export const categories = [
  { id: 'all', label: 'Tất cả', value: null },
  { id: 'camping', label: 'Cắm trại', value: 'camping' },
  { id: 'souvenir', label: 'Đồ lưu niệm', value: 'souvenir' },
  { id: 'motor', label: 'Đồ xe máy', value: 'motor' },
  { id: 'clothing', label: 'Quần áo', value: 'clothing' },
];

const priceRanges = [
  { label: 'Dưới 500K', min: 0, max: 500000 },
  { label: '500K - 1M', min: 500000, max: 1000000 },
  { label: '1M - 2M', min: 1000000, max: 2000000 },
  { label: '2M - 5M', min: 2000000, max: 5000000 },
  { label: 'Trên 5M', min: 5000000, max: 999999999 },
];

export function ProductSidebar() {
  // Mobile drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // URL state management with nuqs
  const [category, setCategory] = useQueryState('category', { defaultValue: '' });
  const [minPrice, setMinPrice] = useQueryState('minPrice', { defaultValue: '' });
  const [maxPrice, setMaxPrice] = useQueryState('maxPrice', { defaultValue: '' });
  const [hasDiscount, setHasDiscount] = useQueryState('hasDiscount', { defaultValue: '' });
  const [freeShip, setFreeShip] = useQueryState('freeShip', { defaultValue: '' });
  const [limited, setLimited] = useQueryState('limited', { defaultValue: '' });

  // Local state for custom price inputs
  const [customMinPrice, setCustomMinPrice] = useState('');
  const [customMaxPrice, setCustomMaxPrice] = useState('');
  const [showCustomPrice, setShowCustomPrice] = useState(false);

  // Close drawer when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isDrawerOpen &&
        !target.closest('.filter-drawer') &&
        !target.closest('.filter-toggle-btn')
      ) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isDrawerOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  // Category handlers
  const handleCategoryChange = (value: string | null) => {
    setCategory(value || null);
  };

  // Price range handlers
  const handlePriceRangeSelect = (range: PriceRange) => {
    setMinPrice(range.min.toString());
    setMaxPrice(range.max === 999999999 ? '' : range.max.toString());
    setShowCustomPrice(false);
  };

  const handleCustomPriceApply = () => {
    if (customMinPrice) setMinPrice(customMinPrice);
    if (customMaxPrice) setMaxPrice(customMaxPrice);
  };

  const clearPriceFilter = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setCustomMinPrice('');
    setCustomMaxPrice('');
    setShowCustomPrice(false);
  };

  // Service checkbox handlers
  const handleServiceToggle = (
    service: 'hasDiscount' | 'freeShip' | 'limited',
    currentValue: string
  ) => {
    const newValue = currentValue === 'true' ? '' : 'true';

    switch (service) {
      case 'hasDiscount':
        setHasDiscount(newValue || null);
        break;
      case 'freeShip':
        setFreeShip(newValue || null);
        break;
      case 'limited':
        setLimited(newValue || null);
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
    setCustomMinPrice('');
    setCustomMaxPrice('');
    setShowCustomPrice(false);
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const hasActiveFilters =
    category ||
    minPrice ||
    maxPrice ||
    hasDiscount === 'true' ||
    freeShip === 'true' ||
    limited === 'true';

  // Count active filters for badge
  const getActiveFilterCount = () => {
    let count = 0;
    if (category) count++;
    if (minPrice || maxPrice) count++;
    if (hasDiscount === 'true') count++;
    if (freeShip === 'true') count++;
    if (limited === 'true') count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  const services = [
    { key: 'hasDiscount' as const, label: 'Có khuyến mãi', value: hasDiscount },
    { key: 'freeShip' as const, label: 'Miễn phí vận chuyển', value: freeShip },
    { key: 'limited' as const, label: 'Số lượng có hạn', value: limited },
  ];

  // Filter content - reused in both desktop and mobile views
  const filterContent = (
    <div className="p-6 space-y-8">
      {/* Categories */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Tag className="w-4 h-4 text-foreground-secondary" />
          <h4 className="font-semibold text-foreground">Danh mục sản phẩm</h4>
        </div>

        <div className="space-y-2">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCategoryChange(cat.value)}
              className={cn(
                'w-full text-left px-4 py-2 rounded-lg border-2 transition-all duration-200 cursor-pointer',
                category === cat.value
                  ? 'border-primary bg-primary/5 text-primary font-medium'
                  : 'border-gray-200 hover:border-gray-300 text-foreground hover:bg-gray-50'
              )}
            >
              <div className="flex items-center justify-between">
                <span>{cat.label}</span>
                {category === cat.value && <Check className="w-4 h-4" />}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-foreground-secondary" />
            <h4 className="font-semibold text-foreground">Khoảng giá</h4>
          </div>
          {(minPrice || maxPrice) && (
            <button
              onClick={clearPriceFilter}
              className="text-foreground-secondary hover:text-foreground"
            >
              <X className="w-4 h-4 cursor-pointer" />
            </button>
          )}
        </div>

        {/* Quick Price Ranges */}
        <div className="space-y-2 mb-4">
          {priceRanges.map((range, index) => {
            const isSelected =
              minPrice === range.min.toString() &&
              (range.max === 999999999 ? !maxPrice : maxPrice === range.max.toString());

            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePriceRangeSelect(range)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-lg border transition-all duration-200 text-sm cursor-pointer',
                  isSelected
                    ? 'border-primary bg-primary/5 text-primary font-medium'
                    : 'border-gray-200 hover:border-gray-300 text-foreground-secondary hover:bg-gray-50'
                )}
              >
                {range.label}
              </motion.button>
            );
          })}
        </div>

        {/* Custom Price Range */}
        <div className="border-t pt-4">
          <button
            onClick={() => setShowCustomPrice(!showCustomPrice)}
            className="text-sm text-primary hover:text-primary/80 font-medium mb-3"
          >
            {showCustomPrice ? 'Ẩn tùy chỉnh' : 'Tùy chỉnh khoảng giá'}
          </button>

          {showCustomPrice && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Từ (VNĐ)</label>
                  <input
                    type="number"
                    value={customMinPrice}
                    onChange={(e) => setCustomMinPrice(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Đến (VNĐ)</label>
                  <input
                    type="number"
                    value={customMaxPrice}
                    onChange={(e) => setCustomMaxPrice(e.target.value)}
                    placeholder="Không giới hạn"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <button
                onClick={handleCustomPriceApply}
                className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Áp dụng
              </button>
            </motion.div>
          )}
        </div>

        {/* Current Price Filter Display */}
        {(minPrice || maxPrice) && (
          <div className="mt-3 p-3 bg-primary/5 rounded-lg">
            <p className="text-sm text-primary font-medium">
              Giá: {minPrice ? formatPrice(Number.parseInt(minPrice)) : '0'} -{' '}
              {maxPrice ? formatPrice(Number.parseInt(maxPrice)) : '∞'} VNĐ
            </p>
          </div>
        )}
      </div>

      {/* Services */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Gift className="w-4 h-4 text-foreground-secondary" />
          <h4 className="font-semibold text-foreground">Dịch vụ</h4>
        </div>

        <div className="space-y-3">
          {services.map((service) => (
            <motion.label
              key={service.key}
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={service.value === 'true'}
                  onChange={() => handleServiceToggle(service.key, service.value)}
                  className="sr-only"
                />
                <div
                  className={cn(
                    'w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center',
                    service.value === 'true'
                      ? 'border-primary bg-primary'
                      : 'border-gray-300 group-hover:border-gray-400'
                  )}
                >
                  {service.value === 'true' && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
              <span
                className={cn(
                  'text-sm transition-colors',
                  service.value === 'true'
                    ? 'text-primary font-medium'
                    : 'text-foreground-secondary group-hover:text-foreground'
                )}
              >
                {service.label}
              </span>
            </motion.label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Bộ lọc sản phẩm</h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-white hover:text-white text-sm underline transition-colors cursor-pointer"
              >
                Mặc định
              </button>
            )}
          </div>
        </div>

        {filterContent}
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="filter-toggle-btn fixed bottom-6 right-6 z-40 bg-secondary text-white rounded-full p-4 shadow-lg flex items-center justify-center cursor-pointer"
        >
          <Filter className="w-5 h-5" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="filter-drawer fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl z-50 lg:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Bộ lọc sản phẩm</h3>
                </div>
                <button onClick={() => setIsDrawerOpen(false)} className="p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content - Scrollable */}
              <div className="flex-1 overflow-y-auto">{filterContent}</div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      clearAllFilters();
                      setIsDrawerOpen(false);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-foreground font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Xóa tất cả
                  </button>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
