import SecondaryButton from "../buttons/SecondaryButton";

const FeatureCardDetails = [
  {
    id: 1,
    title: "Strength Starts Here",
    link: "/shop",
    img: "/assets/Homepage/Feature/feature1.png",
    header: "Metcon 10",
  },
  {
    id: 2,
    title: "Ja 3 'Channel 12'",
    img: "/assets/Homepage/Feature/feature2.png",
    link: "/shop",
  },
  {
    id: 3,
    title: "Never Been Done Is What We Do",
    img: "/assets/Homepage/Feature/feature3.png",
    link: "/shop",
    header: "Air Jordan 40 'Blue Sue",
  },
  {
    id: 4,
    title: "Kids' Erling Haaland Phantom 6 Low",
    img: "/assets/Homepage/Feature/feature4.png",
    link: "/shop",
    header: "Nike Football",
  },
];
const FeatureSection = () => {
  return (
    <div className="pt-8">
      <div>
        <h1
          data-aos="fade-right"
          data-aos-delay="30"
          className="md:text-5xl text-4xl md:px-20 md:text-start text-center font-semibold text-black"
        >
          Featured
        </h1>
        <div className="grid md:grid-cols-2 mt-8 cursor-pointer">
          {FeatureCardDetails.map((card) => (
            <div
              data-aos="zoom-in"
              data-aos-delay="50"
              key={card.id}
              className="relative w-full lg:h-[600px] md:h-[500px] h-[300px] bg-cover bg-center"
              style={{ backgroundImage: `url(${card.img})` }}
            >
              <div
                data-aos="fade-up"
                data-aos-delay="50"
                className="absolute bottom-10 md:left-20 left-5 text-white"
              >
                <p className="md:text-base text-sm font-medium">
                  {card.header}
                </p>
                <h2 className="md:text-2xl text-xl font-medium mt-2">
                  {card.title}
                </h2>
                <SecondaryButton
                  link={card.link}
                  title="Shop"
                  className="bg-white text-black hover:bg-white mt-4"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
