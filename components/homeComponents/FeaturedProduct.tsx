"use client"
import { products } from '@/data/productsData'
import Image from 'next/image'
import React from 'react'
import './FeaturedProducts.css'
const FeaturedProduct : React.FC = () => {
  return (
    <>
    <div id="featured-products" className="section">
        <div className="section_header">
            <h2 className="section_title">Featured Products</h2>

            <a href="#all-products" className="section_link">
                View All Products
            </a>
        </div>
        <div className="product_grid">
            {products.map((product) => (
                <article className="product_card" key={product.id}>
                    {product.badge && (
                        <span
                         className={`product_badge  $ {
                            product.badge === "NEW" ? "product_badge_new" : ""

                        }`}
                        >
                            {product.badge}
                        </span>

                    )}
                    <div className= "product_image_wrap">
                    < Image
                    src={product.image}
                    alt={product.title}
                    className="product_image"
                    width={300}
                    height={300}
                    unoptimized
                    style={{width: "100%", height: "auto"   }}
                    />
                         </div>
                        <div className="product_content">
                            <span className="product_meta">{product.category}</span>
                            <h3 className="product_title" title={product.title}>
                                {product.title}
                            </h3>
                            <div className="product_rating">
                                <span className="star_icon">★</span>
                                <strong >{product.rating}</strong>
                                <span className="rating_text">({product.reviews} reviews)</span>
                            </div>

                            <div className="product_footer">
                                <div className="price_container">
                                    <span className="price_new">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    {product.oldPrice && (
                                        <span className="price_old">
                                            ${product.oldPrice.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                <button className="add_cart_button">+</button>
                            </div>
                        </div>
                </article>
            ))}
        </div>
        </div>    
    </>
  )
}

export default FeaturedProduct