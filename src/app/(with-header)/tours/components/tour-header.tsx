'use client';

import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks';
import { Search } from 'lucide-react';
import { useRef, useState } from 'react';

interface Tour {
  id: string;
  slug: string;
  title: string;
  location: string;
}

export default function TourHeader() {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full max-w-xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Cung đường bạn đang quan tâm"
          className="pl-10 pr-4 h-12 rounded-full"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>

      {/* {debouncedValue && searchResults?.length > 0 && (
        <p className="mt-2 text-sm text-muted-foreground">
          Đang hiển thị {searchResults.length} kết quả cho phần tìm kiếm "{debouncedValue}"
        </p>
      )} */}
    </div>
  );
}
