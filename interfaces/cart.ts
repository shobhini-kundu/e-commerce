export interface ICartItem {
  id: number;
  productId: number;
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
  quantity: number;
  _mockApiId?: string; // mockapi.io's own row id, used for PUT/DELETE
}