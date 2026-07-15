// app/order-confirmation/[orderId]/page.tsx

import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import OrderDetails from "@/components/orderComponent/OrderDetails";

export default async function Page({}: {
  params: Promise<{ orderId: string }>; // 2. Declare params as a Promise
}) {
  return (
    <>
      <Header />
       <OrderDetails />
      <Footer />{" "}
    </>
  );
}