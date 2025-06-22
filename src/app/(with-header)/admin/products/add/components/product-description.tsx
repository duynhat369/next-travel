'use client';

import CardWithHeader from '@/components/CardWithHeader';
import { RichTextEditor } from '@/components/rich-text-editor';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ProductFormData } from '@/lib/validations/product';
import { motion } from 'framer-motion';
import type { Control } from 'react-hook-form';
import { RequiredFormLabel } from './product-info';

interface ProductDescriptionProps {
  control: Control<ProductFormData>;
}

export function ProductDescription({ control }: ProductDescriptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <CardWithHeader title="Mô tả sản phẩm" contentClassName="space-y-6">
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <RequiredFormLabel>Mô tả ngắn</RequiredFormLabel>
              <FormControl>
                <Textarea placeholder="Nhập mô tả ngắn về sản phẩm" rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <Label>Chi tiết sản phẩm</Label>
              <FormControl>
                <RichTextEditor
                  value={field?.value ?? ''}
                  onChange={field.onChange}
                  placeholder="Nhập nội dung chi tiết về sản phẩm..."
                  height="300px"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardWithHeader>
    </motion.div>
  );
}
