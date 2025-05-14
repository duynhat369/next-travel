'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { motion } from 'framer-motion';
import { ArrowUpDown, RotateCcw, Search, Star, Tag, X } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

interface Props {
  lengthResult: number;
  isLoading?: boolean;
}

export default function TourHeader({ lengthResult, isLoading }: Props) {
  const [search, setSearch] = useQueryState('search');
  const [isHot, setIsHot] = useQueryState('isHot', { defaultValue: 'false' });
  const [hasDiscount, setHasDiscount] = useQueryState('hasDiscount', { defaultValue: 'false' });
  const [sort, setSort] = useQueryState('sort', { defaultValue: '' });
  const [inputValue, setInputValue] = useState(search || '');
  const debouncedValue = useDebounce(inputValue, 500);

  // Search param when debounced value changes
  useEffect(() => {
    setSearch(debouncedValue || null);
  }, [debouncedValue, setSearch]);

  // Get active filter count
  const activeFilterCount = [isHot === 'true', hasDiscount === 'true', sort !== ''].filter(
    Boolean
  ).length;

  const getSortLabel = () => {
    switch (sort) {
      case 'price_asc':
        return 'Giá: Thấp đến cao';
      case 'price_desc':
        return 'Giá: Cao đến thấp';
      default:
        return 'Sắp xếp';
    }
  };

  const handleClearFilters = () => {
    setIsHot('false');
    setHasDiscount('false');
    setSort('');
  };

  const toggleHotTour = () => {
    setIsHot(isHot === 'true' ? 'false' : 'true');
  };

  const toggleHasDiscount = () => {
    setHasDiscount(hasDiscount === 'true' ? 'false' : 'true');
  };

  return (
    <div className="relative w-full max-w-xl mb-12">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cung đường bạn đang quan tâm"
          className="pl-10 pr-4 h-12 rounded-full"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 cursor-pointer"
            onClick={() => {
              setInputValue('');
              setSearch(null);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <motion.div
        className="mt-4 flex flex-wrap items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          className={`rounded-full text-white ${
            isHot === 'true' ? 'bg-secondary text-white' : 'bg-muted-foreground'
          } cursor-pointer`}
          onClick={toggleHotTour}
        >
          <Star /> Hot trong tháng
        </Button>

        <Button
          className={`rounded-full text-white ${
            hasDiscount === 'true' ? 'bg-secondary' : 'bg-muted-foreground'
          } cursor-pointer`}
          onClick={toggleHasDiscount}
        >
          <Tag /> Có giảm giá
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={`rounded-full text-white ${
                sort ? 'bg-secondary ' : 'bg-muted-foreground'
              } cursor-pointer`}
            >
              <ArrowUpDown /> {getSortLabel()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 border-none shadow-2xl">
            <DropdownMenuItem
              className="cursor-pointer focus:bg-secondary focus:text-white"
              onClick={() => setSort('')}
            >
              Mặc định
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer focus:bg-secondary focus:text-white"
              onClick={() => setSort('price_asc')}
            >
              Giá: Thấp đến cao
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer focus:bg-secondary focus:text-white"
              onClick={() => setSort('price_desc')}
            >
              Giá: Cao đến thấp
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            className="rounded-full text-foreground-secondary flex items-center gap-1 cursor-pointer"
            onClick={handleClearFilters}
          >
            <RotateCcw className="h-3 w-3" />
            Mặc định
          </Button>
        )}
      </motion.div>

      {!isLoading && debouncedValue ? (
        <p className="mt-3 text-foreground-secondary">
          Đang hiển thị {lengthResult} kết quả cho phần tìm kiếm "{debouncedValue}"
        </p>
      ) : null}
    </div>
  );
}
