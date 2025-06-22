'use client';

import { productApi } from '@/lib/api/product';
import { addProductSchema, ProductFormData } from '@/lib/validations/product';
import { UploadedFile } from '@/types/file';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const createProduct = async (data: ProductFormData): Promise<any> => {
  await productApi.addProduct(data);
};

export function useProductForm() {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<UploadedFile[]>([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(addProductSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      content: '',
      originalPrice: undefined,
      discountPercentage: undefined,
      price: undefined,
      thumbnail: '',
      gallery: [],
      categoryType: [],
      stock: undefined,
      tags: [],
      limited: false,
      freeShip: false,
    },
  });

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      setShowConfirmation(true);
    },
    onError: (error) => {
      console.error('Error creating product:', error);
    },
  });

  const watchOriginalPrice = form.watch('originalPrice');
  const watchDiscountPercentage = form.watch('discountPercentage');

  // Auto calculate price
  useEffect(() => {
    if (watchOriginalPrice) {
      const calculatedPrice = watchOriginalPrice * (1 - (watchDiscountPercentage ?? 0) / 100);
      form.setValue('price', Math.round(calculatedPrice));
    } else form.setValue('price', 0);
  }, [watchOriginalPrice, watchDiscountPercentage, form]);

  // Update form values when images change
  useEffect(() => {
    if (imageFiles.length > 0) {
      const thumbnailUrl = imageFiles[thumbnailIndex]?.url || imageFiles[0]?.url || '';
      const galleryUrls = imageFiles.map((file) => file.url).filter(Boolean);

      form.setValue('thumbnail', thumbnailUrl);
      form.setValue('gallery', galleryUrls);

      // Clear errors if we have images
      if (thumbnailUrl) {
        form.clearErrors('thumbnail');
        form.clearErrors('gallery');
      }
    } else {
      form.setValue('thumbnail', '');
      form.setValue('gallery', []);
    }
  }, [imageFiles, thumbnailIndex, form]);

  const onSubmit = async (data: ProductFormData) => {
    // Set final values
    data.thumbnail = imageFiles[thumbnailIndex]?.url || imageFiles[0]?.url || '';
    data.gallery = imageFiles.map((file) => file.url).filter(Boolean);

    createProductMutation.mutate(data);
  };

  const handleReset = () => {
    form.reset();
    setImageFiles([]);
    setThumbnailIndex(0);
  };

  const goToProductPage = () => {
    router.push('/products');
  };
  const closeModal = () => {
    setShowConfirmation(false);
    handleReset();
  };

  return {
    form,
    imageFiles,
    setImageFiles,
    thumbnailIndex,
    setThumbnailIndex,
    onSubmit,
    handleReset,
    isSubmitting: createProductMutation.isPending,
    isError: createProductMutation.isError,
    error: createProductMutation.error,
    isSuccess: createProductMutation.isSuccess,
    showConfirmation,
    setShowConfirmation,
    goToProductPage,
    closeModal,
  };
}
