'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Form } from '@/components/ui/form';
import { useProductForm } from '@/hooks/use-product-form';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { FieldErrors } from 'react-hook-form';
import { ProductActions } from './components/product-actions';
import { ProductDescription } from './components/product-description';
import { ProductHeader } from './components/product-header';
import { ProductImage } from './components/product-image';
import { ProductInfo } from './components/product-info';

const categoryOptions = [
  { value: 'souvenir', label: 'Souvenir' },
  { value: 'camping', label: 'Camping' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'motor', label: 'Motor' },
];

const tagOptions = [
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'travel', label: 'Travel' },
  { value: 'camping', label: 'Camping' },
  { value: 'hiking', label: 'Hiking' },
  { value: 'protection', label: 'Protection' },
];

export default function AddProductPage() {
  const {
    form,
    imageFiles,
    isSubmitting,
    setImageFiles,
    onSubmit,
    handleReset,
    showConfirmation,
    setShowConfirmation,
    goToProductPage,
    closeModal,
  } = useProductForm();

  const getFieldErrorNames = (formErrors: FieldErrors): string[] => {
    const transformObjectToDotNotation = (
      object: any,
      prefix = '',
      result: string[] = []
    ): string[] => {
      Object.keys(object || {}).forEach((key) => {
        const value = object[key];
        if (!value) return;

        const nextKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'object' && !Array.isArray(value) && value.message === undefined) {
          // Nested object, recurse
          transformObjectToDotNotation(value, nextKey, result);
        } else {
          // This is an error field
          result.push(nextKey);
        }
      });
      return result;
    };

    return transformObjectToDotNotation(formErrors);
  };

  useEffect(() => {
    if (form.formState.isValid) return;
    const fieldErrorNames = getFieldErrorNames(form.formState.errors);
    if (fieldErrorNames.length <= 0) return;
    const element =
      document.querySelector(`input[name='${fieldErrorNames[0]}']`) ||
      document.querySelector(`[data-name='${fieldErrorNames[0]}']`);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [form.formState.submitCount]);

  return (
    <div className="container mx-auto px-4 py-8 mt-20 md:mt-28">
      <ProductHeader />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  lg:grid-rows-1">
            {/* Left Column - Images */}
            <ProductImage
              form={form}
              control={form.control}
              files={imageFiles}
              onFilesChange={setImageFiles}
            />

            {/* Right Column - Product Info */}
            <ProductInfo form={form} categoryOptions={categoryOptions} tagOptions={tagOptions} />
          </div>

          {/* Description Section */}
          <ProductDescription control={form.control} />

          {/* Submit Actions */}
          <ProductActions isSubmitting={isSubmitting} onReset={handleReset} />
        </form>
      </Form>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="max-w-md bg-white">
          <AlertDialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-secondary" />
            </div>
            <AlertDialogTitle className="text-xl font-semibold text-foreground">
              Thêm sản phẩm thành công
            </AlertDialogTitle>
            <AlertDialogDescription className="text-foreground mt-2">
              Sản phẩm của bạn đã được thêm thành công vào danh sách. Bạn có thể thêm sản phẩm mới.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-gray-300 hover:bg-gray-300 text-foreground cursor-pointer"
              onClick={closeModal}
            >
              Đóng
            </AlertDialogAction>
            <AlertDialogAction
              className="bg-secondary hover:bg-secondary/90 text-white cursor-pointer"
              onClick={goToProductPage}
            >
              Tới trang sản phẩm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
