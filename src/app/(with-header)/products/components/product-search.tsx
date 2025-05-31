'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { Search, X } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

interface Props {
  lengthResult: number;
  isLoading?: boolean;
}

export default function ProductSearch({ lengthResult, isLoading }: Props) {
  const [search, setSearch] = useQueryState('search');
  const [inputValue, setInputValue] = useState(search || '');
  const debouncedValue = useDebounce(inputValue, 500);

  // Search param when debounced value changes
  useEffect(() => {
    setSearch(debouncedValue || null);
  }, [debouncedValue, setSearch]);

  return (
    <div className="relative w-full mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Sản phẩm bạn đang quan tâm"
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
    </div>
  );
}
