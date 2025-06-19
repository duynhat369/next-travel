'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronDown, Plus, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  allowCreate?: boolean;
  maxItems?: number;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Chọn...',
  searchPlaceholder = 'Tìm kiếm...',
  allowCreate = false,
  maxItems,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [search, options]);

  const handleSelect = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      if (maxItems && value.length >= maxItems) return;
      onChange([...value, optionValue]);
    }
  };

  const handleCreate = () => {
    if (search && !options.find((opt) => opt.value === search)) {
      if (maxItems && value.length >= maxItems) return;
      onChange([...value, search]);
      setSearch('');
    }
  };

  const handleRemove = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  const selectedOptions = value.map(
    (v) => options.find((opt) => opt.value === v) || { value: v, label: v }
  );

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-10 p-2 border-input bg-white"
          >
            <div className="flex flex-wrap gap-1">
              {selectedOptions.length > 0 ? (
                selectedOptions.map((option) => (
                  <Badge key={option.value} className="text-xs text-white">
                    {option.label}
                    <X
                      className="ml-1 h-3 w-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(option.value);
                      }}
                    />
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-white" align="start">
          <div className="p-2">
            <Input
              ref={inputRef}
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8"
            />
          </div>
          <div className="max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center px-2 py-1.5 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(option.value)}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    value.includes(option.value) ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {option.label}
              </div>
            ))}
            {allowCreate && search && !filteredOptions.find((opt) => opt.value === search) && (
              <div
                className="flex items-center px-2 py-1.5 cursor-pointer hover:bg-gray-100 text-blue-600"
                onClick={handleCreate}
              >
                <Plus className="mr-2 h-4 w-4" />
                Tạo "{search}"
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
