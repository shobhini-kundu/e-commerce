export interface ICartItem {
    id: number;
    title: string;
    category: string;
    price: number;
    oldPrice?: number;
    rating: number;
    reviews: number;
    badge?: string;
    image: string;
    quantity: number;
  }