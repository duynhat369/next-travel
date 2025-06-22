'use client';

import CardWithHeader from '@/components/CardWithHeader';
import { ImageUpload } from '@/components/ImageUpload';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import type { ProductFormData } from '@/lib/validations/product';
import { UploadedFile } from '@/types/file';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Control, UseFormReturn } from 'react-hook-form';
import { RequiredFormLabel } from './product-info';

interface ProductImageSectionProps {
  form: UseFormReturn<ProductFormData>;
  control: Control<ProductFormData>;
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
}

export function ProductImage({ form, control, files, onFilesChange }: ProductImageSectionProps) {
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const imageError = form?.formState.errors.thumbnail?.message;

  // Update form values when files change
  useEffect(() => {
    if (files.length > 0) {
      const thumbnailUrl = files[thumbnailIndex]?.url || files[0]?.url || '';
      const galleryUrls = files.map((file) => file.url).filter(Boolean);

      control._formValues.thumbnail = thumbnailUrl;
      control._formValues.gallery = galleryUrls;

      // Trigger validation
      if (thumbnailUrl) {
        control._formState.errors.thumbnail = undefined;
        control._formState.errors.gallery = undefined;
      }
    } else {
      control._formValues.thumbnail = '';
      control._formValues.gallery = [];
    }
  }, [files, thumbnailIndex, control]);

  const handleThumbnailChange = (index: number) => {
    setThumbnailIndex(index);
    if (files[index]?.url) {
      control._formValues.thumbnail = files[index].url;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="h-full overflow-hidden"
      data-name="thumbnail"
    >
      <CardWithHeader
        title="Hình ảnh sản phẩm"
        className="h-full flex flex-col"
        contentClassName="flex-1"
      >
        <FormField
          control={control}
          name="gallery"
          render={() => (
            <FormItem>
              <RequiredFormLabel>Thêm ảnh</RequiredFormLabel>
              <FormControl>
                <ImageUpload
                  files={files}
                  onFilesChange={onFilesChange}
                  maxFiles={10}
                  required
                  error={imageError}
                  thumbnailIndex={thumbnailIndex}
                  onThumbnailChange={handleThumbnailChange}
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
