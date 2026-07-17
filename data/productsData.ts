import { ICategory, IProduct } from "@/interfaces/products";

export const categories: ICategory[] = [
    {
      id: 1,
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Clothing",
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Home & Living",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Sports & Wellness",
      image:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
    },
  ];

  export const products : IProduct[] = [
    {
      id: 1,  
      title: "Premium Noise-Cancelling Headphones",
      category: "Electronics",
      price: 189.99,
      oldPrice: 249.99,
      rating: 4.8,
      reviews: 120,
      badge: "Sale",
      image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    },
    {
    id: 2,
    title: "Minimalist Leather Smart Watch",
    category: "Electronics",
    price: 149.5,
    rating: 4.5,
    reviews: 82,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    title: "Organic Cotton Casual Jacket",
    category: "Clothing",
    price: 85.0,
    rating: 4.9,
    reviews: 215,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    title: "Ergonomic Drip Coffee Maker",
    category: "Home & Living",
    price: 45.99,
    oldPrice: 59.99,
    rating: 4.2,
    reviews: 47,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
  }]