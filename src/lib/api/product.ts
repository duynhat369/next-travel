import { ProductDetailResponse, ProductFilters, ProductsResponse } from '@/types/product.types';
import mongoose from 'mongoose';
import axiosClient from '../axios';

export const productApi = {
  getProducts: async (params: ProductFilters = {}): Promise<ProductsResponse> => {
    let queryParams: ProductFilters = {};

    if (typeof params === 'number') {
      queryParams = { page: params, limit: 12 };
    } else {
      queryParams = { ...params };
    }

    const {
      page = 1,
      limit = 12,
      search,
      sort,
      inStock,
      hasDiscount,
      freeShip,
      limited,
      minPrice,
      maxPrice,
      category,
    } = queryParams;

    return axiosClient.get('/products', {
      params: {
        page,
        limit,
        ...(search && { search }),
        ...(sort && { sort }),
        ...(inStock !== undefined && { inStock }),
        ...(freeShip !== undefined && { freeShip }),
        ...(limited !== undefined && { limited }),
        ...(hasDiscount !== undefined && { hasDiscount }),
        ...(minPrice !== undefined && { minPrice }),
        ...(maxPrice !== undefined && { maxPrice }),
        ...(category && { category }),
      },
    });
  },
  getProductById: async (id: string | mongoose.Types.ObjectId): Promise<ProductDetailResponse> => {
    return axiosClient.get(`/products/${id}`);
  },
};
