export interface Product {
  _id?: string;
  name: string;
  description: string;
  content: string; // Content HTML chi tiết
  productCode: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  thumbnail: string;
  gallery: string[];
  categoryType: ProductCategory[];
  stock: number;
  tags: string[]; // Tags cho SEO
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductCategory = 'souvenir' | 'camping' | 'clothing' | 'motor';

export interface ProductFilters {
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  hasDiscount?: boolean;
  freeShip?: boolean;
  limited?: boolean;
  inStock?: boolean;
}

export interface ProductsResponse {
  success: boolean;
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
  };
}
export interface ProductDetailResponse {
  success: boolean;
  product: Product;
}

export interface AddProductRequest {
  name: string;
  description: string;
  content: string;
  productCode: string;
  price: number;
  originalPrice: number;
  discountPercentage?: number;
  thumbnail: string;
  gallery?: string[];
  categoryType: ProductCategory[];
  stock?: number;
  tags?: string[];
}
