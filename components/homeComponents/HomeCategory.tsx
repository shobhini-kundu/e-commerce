"use client";

import React from "react";
import "./HomeCategory.css";
import { categories } from "@/data/productsData";
import Image from "next/image";

const HomeCategory: React.FC = () => {
  return (
    <>
      <div className="home_category_section">
        <div className="category_header">Shop by Category</div>
        <div className="category_images">
          {categories.map((category, index) => {
            return (
              <div key={index} className="cat_card">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="category_card_img"
                  width={100}
                  height={100}
                  unoptimized
                  style={{
                    width: "100% !important",
                    height: "100% !important",
                  }}
                />
                <div className="cat_name">{category.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HomeCategory;