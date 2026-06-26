import HomeBanner from "@/components/homeComponents/HomeBanner";
import HomeCategory from "@/components/homeComponents/HomeCategory";
import Header from "@/components/layouts/Header";

export default function Home() {
  return (<>
      <Header/>
      <HomeBanner/>
      <HomeCategory/>
    </>
  );
}
