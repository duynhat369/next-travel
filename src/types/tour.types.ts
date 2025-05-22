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
  itinerary: string;
  whatToBring: string[];
  guides: {
    name: string;
    avatar: string;
    bio: string;
  }[];
  gallery: string[];
  createdAt: Date;
  updatedAt: Date;
}
