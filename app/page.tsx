import HomeBanner from "@/components/homeComponents/HomeBanner";
import HomeCategory from "@/components/homeComponents/HomeCategory";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";

export default function Home() {
  return (<>
      <Header/>
      <HomeBanner/>
      <HomeCategory/>
      <Footer/>
    </>
  );
}
