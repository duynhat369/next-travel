'use client';

import CardWithHeader from '@/components/CardWithHeader';
import { ImageUpload } from '@/components/ImageUpload';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import type { ProductFormData } from '@/lib/validations/product';
import { UploadedFile } from '@/types/file';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Control } from 'react-hook-form';
import { RequiredFormLabel } from './product-info';

interface ProductImageSectionProps {
  control: Control<ProductFormData>;
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
}

export function ProductImage({ control, files, onFilesChange }: ProductImageSectionProps) {
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  // const handleFilesChange = (newFiles: UploadedFile[]) => {
  //   onFilesChange(newFiles);

  //   // Update form values
  //   if (newFiles.length > 0) {
  //     const thumbnailUrl = newFiles[thumbnailIndex]?.url || newFiles[0]?.url || '';
  //     const galleryUrls = newFiles.map((file) => file.url).filter(Boolean);

  //     // Set thumbnail (first image or selected thumbnail)
  //     control._formValues.thumbnail = thumbnailUrl;

  //     // Set gallery (all images)
  //     control._formValues.gallery = galleryUrls;
  //   } else {
  //     control._formValues.thumbnail = '';
  //     control._formValues.gallery = [];
  //   }
  // };

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
      className="min-h-full"
    >
      <CardWithHeader
        title="Hình ảnh sản phẩm"
        className="min-h-full flex flex-col"
        contentClassName="flex-1"
      >
        <FormField
          control={control}
          name="gallery"
          render={({ field, fieldState }) => (
            <FormItem>
              <RequiredFormLabel>Thêm ảnh</RequiredFormLabel>
              <FormControl>
                <ImageUpload
                  files={files}
                  onFilesChange={onFilesChange}
                  maxFiles={10}
                  required
                  error={fieldState.error?.message}
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
