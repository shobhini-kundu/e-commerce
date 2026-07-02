"use Client";
import React from "react";
import "./Footer.css";
import { TiSocialFacebook } from "react-icons/ti";
import { RiInstagramLine } from "react-icons/ri";
import { footerData } from "@/data/footerData";
const Footer: React.FC = () => {
  return (
    <>
      <div className="footer_section">
        <div className="footer_top">
          <div className="logo_left">
            <div className="logo">ShopEase</div>
            <div className="description">
              Building the future of convenient online shopping. We provide
              verified authentic items straight to your doorstep.
            </div>
            <div className="social_media">
              <div className="social_link">
                <TiSocialFacebook />
              </div>
              <div className="social_link">
                <RiInstagramLine />
              </div>
            </div>
          </div>
          <div className="page_links">
            {footerData.map((section, index) => (
              <div className="link_column" key={index}>
                <div className="column_title">{section.title}</div>
                <ul>
                  {section.urlData.map((link, i) => (
                    <li key={i}>
                      <a href={link.urlLink}>{link.urlTitle}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer_bottom">
          <div className="copyright">
            @ copyright ShopEase. All right reserved.
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
