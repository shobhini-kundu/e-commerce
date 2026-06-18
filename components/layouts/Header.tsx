"use client"
import React from 'react'
import "./Header.css"
import { FiHome } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className= "box_1">
        <div className='icon_1'><FiHome /></div>
        <div className="title">ShopEase</div> 
      </div>
        <div className="box_2">
          <div className="icon_2">
            <FaRegUser />
          </div>
          <div className="icon_3"><LuShoppingCart />
          </div>
      </div>
    </div>
  )
}

export default Header