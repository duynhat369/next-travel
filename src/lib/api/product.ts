import { ProductFilters, ProductResponse } from '@/types/product.types';
import axiosClient from '../axios';

export const productApi = {
  getProducts: async (params: ProductFilters = {}): Promise<ProductResponse> => {
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
      },
    });
  },
  getTourById: async (slug: string): Promise<ProductResponse> => {
    return axiosClient.get(`/products/${slug}`);
  },
};
