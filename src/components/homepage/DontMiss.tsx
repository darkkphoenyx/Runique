import HeroCTA from "./HeroCTA";

const DontMiss = () => {
  return (
    <div className="pt-20">
      <div>
        <h1
          data-aos="fade-right"
          data-aos-delay="30"
          className="md:text-5xl text-4xl md:px-20 md:text-start text-center font-semibold text-black"
        >
          Don't Miss
        </h1>
        <div data-aos="zoom-in" className="mt-4">
          <img
            src="/assets/Homepage/DontMiss/img1.jpg"
            alt="img1"
            className="object-cover"
          />
        </div>

        <HeroCTA
          link="/shop"
          btnText="Shop All Tenis"
          title="PRESSURE-TESTED, <br/> PRO-APPROVED."
          desc="Serve grand slam styles, inspired by tennis' bests like Aryna Sabalenka."
        />
      </div>
    </div>
  );
};

export default DontMiss;
