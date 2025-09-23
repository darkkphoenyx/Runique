import { Link } from "react-router-dom";
import SecondaryButton from "../buttons/SecondaryButton";

const HeroCTA = ({
  title,
  desc,
  header,
  link,
  btnText,
}: {
  title: string;
  header?: string;
  link: string;
  desc: string;
  btnText: string;
}) => {
  return (
    <div className="max-w-7xl mx-auto py-20 px-4 flex items-center text-center justify-center">
      <div className="space-y-4 md:space-y-0">
        <p data-aos="fade-up" className="text-lg font-medium">
          {header}
        </p>
        <h1
          data-aos="fade-up"
          data-aos-delay="30"
          className="md:text-7xl text-4xl font-extrabold text-black"
        >
          <div dangerouslySetInnerHTML={{ __html: title }} />
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="50"
          className="mt-2 md:px-0 px-4 font-medium"
        >
          {desc}
        </p>
        <div data-aos="fade-up" data-aos-delay="70">
          <Link to={link}>
            <SecondaryButton title={btnText} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroCTA;
