"use client";
import { useEffect, useState } from "react";
import { products as fallbackProducts } from "@/data/productsData";

import { useCart } from "@/context/CartContext";

import "./FeaturedProducts.css";
import Image from "next/image";

import { fetchProducts } from "@/services/api";
import { IProduct } from "@/interfaces/products";

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, isAddingToCart } = useCart();
  const [addingId, setAddingId] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    fetchProducts()
      .then((data: IProduct[]) => {
        if (active) setProducts(data);
      })
      .catch((err: unknown) => {
        console.error(err);
        if (active) {
          setError("Couldn't load products, showing fallback.");
          setProducts(fallbackProducts);
        }
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const handleAddToCart = async (product: IProduct) => {
    setAddingId(product.id);
    const payload = {
      productId: product.id,
      ...product,
    };
    try {
      await addToCart(payload);
    } catch (err) {
      console.error("Add to cart failed:", err);
    } finally {
      setAddingId(null);
    }
  };

  if (loading) {
    return (
      <div id="featured-products" className="section">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div id="featured-products" className="section">
      <div className="section_header">
        <h2 className="section_title">Featured Products</h2>
        <a href="#all-products" className="section_link">
          View All Products
        </a>
      </div>

      {error && <p className="product_error">{error}</p>}

      <div className="product_grid">
        {products.map((product) => (
          <article className="product_card" key={product.id}>
            {product.badge && (
              <span
                className={`product_badge ${
                  product.badge === "NEW" ? "product_badge_new" : ""
                }`}
              >
                {product.badge}
              </span>
            )}

            <div className="product_image_wrap">
              <Image
                src={product.image}
                alt={product.title}
                className="product_image"
                width={300}
                height={300}
                unoptimized
                style={{ width: "100%", height: "auto" }}
              />
            </div>

            <div className="product_content">
              <span className="product_meta">{product.category}</span>
              <h3 className="product_title" title={product.title}>
                {product.title}
              </h3>

              <div className="product_rating">
                <span className="star_icon">★</span>
                <strong>{product.rating}</strong>
                <span className="rating_text">({product.reviews} reviews)</span>
              </div>

              <div className="product_footer">
                <div className="price_container">
                  <span className="price_new">${product.price.toFixed(2)}</span>
                  {product.oldPrice && (
                    <span className="price_old">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  className="add_cart_button"
                  onClick={() => handleAddToCart(product)}
                  disabled={isAddingToCart && addingId === product.id}
                >
                  {isAddingToCart && addingId === product.id ? "…" : "+"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;