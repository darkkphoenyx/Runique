import TextType from "@/reactbits/TextType/TextType";
import SecondaryButton from "../buttons/SecondaryButton";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="bg-radial from-red-500 to-red-900 h-screen">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 px-4">
        <div
          data-aos="fade-right"
          className="text-white lg:mt-[350px] md:mt-[300px] mt-[180px] md:z-0 z-10"
        >
          <h2 className="md:text-[128px] text-6xl text-white font-extrabold md:text-start text-center">
            RUN<span className="text-yellow-300">I</span>QUE
          </h2>
          <div
            className="lg:text-6xl md:text-4xl cursor-default text-3xl mt-4 italic md:text-start text-center"
            style={{ fontFamily: "Priestacy" }}
          >
            Unique shoes{" "}
            <span className=" text-yellow-400">
              <TextType
                text={["for every run!", "for every hustle!"]}
                typingSpeed={100}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />
            </span>
          </div>
          <div className="mt-8 md:text-start text-center">
            <Link to={"/shop"}>
              <SecondaryButton
                title="Buy Now"
                className="bg-white hover:bg-white text-black"
              />
            </Link>
          </div>
        </div>
        <img
          data-aos="fade-down"
          src="/assets/Homepage/Hero/Hero.png"
          alt="hero section"
          className="object-cover md:relative absolute md:top-0 top-20 hidden md:block"
        />
        <img
          src="/assets/Homepage/Hero/Hero.png"
          alt="hero section"
          className="object-cover md:relative absolute top-7 block md:hidden scale-90"
        />
      </div>
    </div>
  );
};

export default HeroSection;
