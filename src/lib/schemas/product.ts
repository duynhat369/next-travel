import { Product } from '@/types/product.types';
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    productCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    thumbnail: { type: String, required: true },
    gallery: { type: [String], default: [] },
    categoryType: {
      type: [String],
      required: true,
      enum: ['souvenir', 'camping', 'clothing', 'motor'],
    },
    stock: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ categoryType: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });

export function getProductModel() {
  return mongoose.models.Product || mongoose.model<Product>('Product', productSchema);
}
