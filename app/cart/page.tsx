import CartSection from '@/components/cartComponent/CartSection'
import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import React from 'react'



const page : React.FC= () => {
  return (
<>
<Header/>
<CartSection/>
<Footer/>
</>  );
};

export default page