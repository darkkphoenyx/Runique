import SecondaryButton from "../buttons/SecondaryButton";

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
          <p
            className="lg:text-6xl text-4xl mt-4 italic md:text-start text-center"
            style={{ fontFamily: "Priestacy" }}
          >
            Unique shoes{" "}
            <span className=" text-yellow-400">for every run!</span>
          </p>
          <div className="mt-8">
            <SecondaryButton link="/shop" title="Buy Now" className="bg-white hover:bg-white text-black" />
          </div>
        </div>
        <img
          data-aos="fade-down"
          src="/assets/Hero/Hero.png"
          alt="hero section"
          className="object-cover md:relative absolute md:top-0 top-20 hidden md:block"
        />
        <img
          src="/assets/Hero/Hero.png"
          alt="hero section"
          className="object-cover md:relative absolute top-7 block md:hidden scale-90"
        />
      </div>
    </div>
  );
};

export default HeroSection;
