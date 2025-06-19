'use client';

import { Form } from '@/components/ui/form';
import { useProductForm } from '@/hooks/use-product-form';
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
  const { form, imageFiles, isSubmitting, setImageFiles, onSubmit, handleReset } = useProductForm();

  return (
    <div className="container mx-auto px-4 py-8 mt-20 md:mt-28">
      <ProductHeader />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <ProductImage control={form.control} files={imageFiles} onFilesChange={setImageFiles} />

            {/* Right Column - Product Info */}
            <ProductInfo form={form} categoryOptions={categoryOptions} tagOptions={tagOptions} />
          </div>

          {/* Description Section */}
          <ProductDescription control={form.control} />

          {/* Submit Actions */}
          <ProductActions isSubmitting={isSubmitting} onReset={handleReset} />
        </form>
      </Form>
    </div>
  );
}
