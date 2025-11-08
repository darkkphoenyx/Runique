import SecondaryButton from "@/components/buttons/SecondaryButton";
import { Link } from "react-router-dom";

const AboutHeroSection = () => {
  return (
    <div className="min-h-screen mt-32 px-4">
      <div className="grid lg:grid-cols-2 grid-cols-1 items-center">
        <div className="transition-all lg:text-[156px] md:text-[128px] text-6xl font-extrabold lg:leading-[130px] md:leading-[110px] tracking-[1px]">
          <span data-aos="fade" data-aos-delay="100" data-aos-once="true">
            We <br />
          </span>
          <span data-aos="fade" data-aos-delay="300" data-aos-once="true">
            Serve <br />
          </span>
          <span data-aos="fade" data-aos-delay="500" data-aos-once="true">
            Shoes <br />
          </span>
          <span data-aos="fade" data-aos-delay="700" data-aos-once="true">
            For Every <br />
          </span>
          <span
            data-aos="fade"
            data-aos-delay="900"
            data-aos-once="true"
            className="md:-ml-3 -ml-1 lg:text-[350px] md:text-[300px] text-[130px] md:leading-[280px] leading-[140px]"
          >
            Run!
          </span>
        </div>
        <div className="flex items-center justify-center h-full lg:my-0 md:my-20 my-10">
          <Link data-aos="fade-left" data-aos-once="true" to={"/shop"}>
            <SecondaryButton
              className="lg:text-5xl md:text-4xl text-2xl md:py-10 py-7 md:px-20 px-10 rounded-full border-2"
              title="Buy Now"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutHeroSection;
