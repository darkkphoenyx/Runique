import SecondaryButton from "../buttons/SecondaryButton";

const HooperSection = () => {
  return (
    <div className="max-w-7xl mx-auto py-20 px-4 flex items-center text-center justify-center">
      <div className="space-y-4 md:space-y-0">
        <p data-aos="fade-up" className="text-lg font-medium">
          Sabrina 3
        </p>
        <h1
          data-aos="fade-up"
          data-aos-delay="30"
          className="md:text-7xl text-5xl font-extrabold text-black"
        >
          THE HOOPERS <br /> BLUEPRINT
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="50"
          className="mt-2 md:px-0 px-4 font-medium"
        >
          Build your game like the best in Sabrina's latest collection.
        </p>
        <div data-aos="fade-up" data-aos-delay="70">
          <SecondaryButton link="/shop" title="Shop Now" />
        </div>
      </div>
    </div>
  );
};

export default HooperSection;
