// interfaces/order.ts
export interface IOrderItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrder {
  id?: string; // mockapi row id
  userId: string;
  orderId: string; // human-readable order number
  name: string;
  email: string;
  mobile: string;
  address: string;
  items: IOrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: string;
  estimatedDelivery: string;
  createdAt: string;
}