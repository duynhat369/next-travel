'use client';

import CardWithHeader from '@/components/CardWithHeader';
import { MultiSelect } from '@/components/multi-select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import type { ProductFormData } from '@/lib/validations/product';
import { formatCurrency } from '@/utils/currency';
import type { UseFormReturn } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

interface ProductInfoProps {
  form: UseFormReturn<ProductFormData>;
  categoryOptions: Array<{ value: string; label: string }>;
  tagOptions: Array<{ value: string; label: string }>;
}

export const RequiredFormLabel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <FormLabel className={`text-foreground-secondary ${className}`}>
    {children} <span className="text-red-500">*</span>
  </FormLabel>
);

export function ProductInfo({ form, categoryOptions, tagOptions }: ProductInfoProps) {
  const { control } = form;
  const priceWatch = form.watch('price');

  return (
    <CardWithHeader title="Thông tin sản phẩm" contentClassName="space-y-6">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <RequiredFormLabel>Tên sản phẩm</RequiredFormLabel>
            <FormControl>
              <Input placeholder="Nhập tên sản phẩm" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="categoryType"
        render={({ field }) => (
          <FormItem>
            <RequiredFormLabel>Danh mục</RequiredFormLabel>
            <FormControl>
              <MultiSelect
                {...field}
                options={categoryOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder="Chọn danh mục"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <MultiSelect
                options={tagOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder="Chọn hoặc tạo tags"
                allowCreate
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4 items-start">
        <FormField
          control={control}
          name="originalPrice"
          render={({ field }) => (
            <FormItem>
              <RequiredFormLabel>Giá gốc</RequiredFormLabel>
              <FormControl>
                <NumericFormat
                  value={field.value}
                  onValueChange={(values) =>
                    field.onChange(values.floatValue ? Number(values.floatValue) : undefined)
                  }
                  thousandSeparator={','}
                  decimalScale={0}
                  fixedDecimalScale={true}
                  allowNegative={false}
                  valueIsNumericString
                  suffix={' VNĐ'}
                  onBlur={() => {
                    if (field.value < 0) {
                      field.onChange(0);
                    } else if (field.value > 999999999999999) {
                      field.onChange(999999999999999);
                    }
                  }}
                  customInput={Input}
                  placeholder={'Nhập giá gốc'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="discountPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giảm giá (%)</FormLabel>
              <FormControl>
                <NumericFormat
                  value={field.value}
                  onValueChange={(values) =>
                    field.onChange(values.floatValue ? Number(values.floatValue) : undefined)
                  }
                  suffix={' %'}
                  onBlur={() => {
                    if (field.value && field.value > 100) {
                      field.onChange(100);
                    }
                  }}
                  customInput={Input}
                  placeholder={'Nhập phần trăm giảm giá'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="text-primary font-semibold">Giá bán: {formatCurrency(priceWatch)} VNĐ</div>

      <FormField
        control={control}
        name="stock"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Số lượng trong kho</FormLabel>
            <FormControl>
              <NumericFormat
                // {...field}
                value={field.value || ''}
                placeholder="Nhập số lượng"
                min="0"
                onValueChange={(values) =>
                  field.onChange(values.floatValue ? Number(values.floatValue) : undefined)
                }
                customInput={Input}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex items-center justify-start space-x-8">
        <FormField
          control={control}
          name="limited"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-1.5">
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Số lượng có hạn</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="freeShip"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-1.5">
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Miễn phí vận chuyển</FormLabel>
            </FormItem>
          )}
        />
      </div>
    </CardWithHeader>
  );
}
