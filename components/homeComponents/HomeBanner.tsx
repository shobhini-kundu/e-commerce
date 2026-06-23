"use client";
import Image from "next/image";
import React from "react";
import "./HomeBanner.css";
const HomeBanner: React.FC = () => {
  return (
    <>
      <div className="main_banner">
        <div className="banner_left">
          <p className="sub_title">Summer Exclusive Collection</p>
          <h4 className="title">Discover the Art of Smart Modern Living</h4>
          <p className="description">
            Upgrade your lifestyle and productivity setup with upto 40% off our
            verified catalog items. Valid till with week only
          </p>
        </div>
        <div className="banner_right">
          <Image
            src="/assets/images/home/image.png"
            alt="Banner Image"
            className="hero_image"
            height={100}
            width={50}
            unoptimized
            style={{ width: "100% !important", height: "auto !important" }}
          />
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
