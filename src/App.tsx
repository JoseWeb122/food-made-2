import { useState } from "react";
import { ShopProvider } from "@/store/shop";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Ribbon, { RibbonLight } from "@/components/Ribbon";
import Intro from "@/components/Intro";
import StoryTabs from "@/components/StoryTabs";
import Collections from "@/components/Collections";
import BestSellers from "@/components/BestSellers";
import Shop from "@/components/Shop";
import BundleBuilder from "@/components/BundleBuilder";
import Trust from "@/components/Trust";
import Stores from "@/components/Stores";
import Social from "@/components/Social";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import QuickView from "@/components/QuickView";
import ProductDetail from "@/components/ProductDetail";
import NotifyModal from "@/components/NotifyModal";
import SearchOverlay from "@/components/SearchOverlay";
import Toasts from "@/components/Toasts";

export default function App() {
  const [collection, setCollection] = useState("all");

  return (
    <ShopProvider>
      <div className="min-h-screen w-full overflow-x-clip bg-cream">
        <Header />
        <main>
          <Hero />
          <Ribbon />
          <Intro />
          <StoryTabs />
          <Collections onPick={setCollection} />
          <BestSellers />
          <RibbonLight />
          <Shop collection={collection} setCollection={setCollection} />
          <BundleBuilder />
          <Trust />
          <Stores />
          <Social />
          <Newsletter />
        </main>
        <Footer onPick={setCollection} />

        <CartDrawer />
        <QuickView />
        <ProductDetail />
        <NotifyModal />
        <SearchOverlay />
        <Toasts />
      </div>
    </ShopProvider>
  );
}
