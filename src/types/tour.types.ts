export interface Tour {
  _id: string;
  title: string;
  description: string;
  slug: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  thumbnail: string;
  isHot: boolean;
  createdAt: Date;
  updatedAt: Date;
}
