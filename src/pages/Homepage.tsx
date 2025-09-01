import DontMiss from "@/components/homepage/DontMiss";
import FeatureSection from "@/components/homepage/FeatureSection";
import HeroCTA from "@/components/homepage/HeroCTA";
import HeroSection from "@/components/homepage/HeroSection";

const Homepage = () => {
  return (
    <div>
      <HeroSection />
      <HeroCTA
        header="Sabrina 3"
        title="THE HOOPERS <br /> BLUEPRINT"
        desc="Build your game like the best in Sabrina's latest collection."
        link="/shop"
        btnText="Shop Now"
      />
      <hr className="border border-black" />
      <FeatureSection />
      <DontMiss />
    </div>
  );
};

export default Homepage;
