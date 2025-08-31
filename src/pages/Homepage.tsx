import FeatureSection from "@/components/homepage/FeatureSection";
import HeroSection from "@/components/homepage/HeroSection";
import HooperSection from "@/components/homepage/HooperSection";

const Homepage = () => {
  return (
    <div>
      <HeroSection />
      <HooperSection />
      <hr className="border border-black" />
      <FeatureSection />
    </div>
  );
};

export default Homepage;
