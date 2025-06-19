'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';

interface ProductActionsProps {
  isSubmitting: boolean;
  onReset: () => void;
}

export function ProductActions({ isSubmitting, onReset }: ProductActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex justify-end gap-4"
    >
      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        className="bg-white text-foreground-secondary cursor-pointer"
      >
        Hủy bỏ
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="min-w-[150px] bg-primary text-white cursor-pointer"
      >
        {isSubmitting ? (
          'Đang lưu...'
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" />
            Lưu sản phẩm
          </>
        )}
      </Button>
    </motion.div>
  );
}
