import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import AllOrders from "@/components/orderComponent/AllOrder";
import React from "react";

const page: React.FC = () => {
  return (
    <>
      <Header />
      <AllOrders />
      <Footer />
    </>
  );
};

export default page;