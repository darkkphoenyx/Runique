import { BookOpen, GraduationCap } from "lucide-react";
import HoverPreview from "../../components/HoverPreview";
import { Card, CardDescription, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const AboutSection = () => {
  return (
    <div className=" bg-gray-800 md:rounded-t-[50px] rounded-t-[30px] overflow-hidden">
      <section className="overflow-x-hidden z-10 w-full h-auto max-w-7xl mx-auto lg:py-20 md:py-20 py-20 text-primary flex flex-col md:flex-row items-center gap-12 md:gap-8 md:pl-4 md:p-0 px-4">
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2
            data-aos="fade-right"
            className="md:text-5xl text-4xl font-bold mb-12 text-secondary"
            style={{ fontFamily: "Priestacy" }}
          >
            Know Me
          </h2>
          <div
            data-aos="fade-right"
            data-aos-delay="50"
            className="text-lg leading-relaxed text-secondary max-w-xl mx-auto md:mx-0"
          >
            Hi👋! I'm Deepesh. I'm a passionate developer with strong expertise
            in frontend development using{" "}
            <HoverPreview label="React" url="https://reactjs.org" />,{" "}
            <HoverPreview
              label="Typescript"
              url="https://www.typescriptlang.org/"
            />
            ,{" "}
            <HoverPreview label="Tailwind CSS" url="https://tailwindcss.com/" />
            , <HoverPreview label="ShadCN" url="https://ui.shadcn.com/" />
            . I focus on building clean, responsive, and scalable user
            interfaces with reusable components and optimized performance.
            <br />
            <br />
            While frontend is my core strength, I’m actively expanding my
            backend skills in{" "}
            <HoverPreview label="Node.JS" url="https://nodejs.org/en" />
            , <HoverPreview label="PHP" url="https://www.php.net/" />, and{" "}
            <HoverPreview label="PostgreSQL" url="https://www.postgresql.org" />{" "}
            to become a well-rounded full-stack developer. Driven by curiosity
            and problem-solving, I enjoy owning projects end-to-end and
            continuously learning new technologies to deliver impactful and
            maintainable solutions.
          </div>
          <div className="md:mt-8 mt-16 space-y-4">
            <h2
              data-aos="fade-right"
              className="flex items-center gap-2 font-medium text-2xl justify-center md:justify-start text-secondary"
            >
              <GraduationCap size={34} />
              Education
            </h2>
            <Card
              data-aos="fade-right"
              data-aos-delay="30"
              className="bg-gray-800 px-10 py-4 rounded-3xl gap-2 border-secondary"
            >
              <CardTitle className="flex items-center gap-2 font-medium text-xl text-secondary">
                BSc.CSIT
              </CardTitle>
              <div className="flex space-y-2 md:space-y-0 justify-between lg:items-center md:flex-row flex-col items-start">
                <CardDescription className="text-gray-300 flex gap-2 text-start lg:text-center">
                  <BookOpen size={20} />
                  Tribhuvan University, Kathmandu - Nepal
                </CardDescription>
                <Badge className="rounded-4xl text-secondary border border-secondary/50 bg-secondary/10 px-3 py-2">
                  2023 - Present
                </Badge>
              </div>
            </Card>
          </div>
        </div>
        <div
          data-aos="fade-left"
          className="w-full md:w-1/2 flex justify-center h-max"
        >
          <img
            src="./theDeepesh.jpg"
            alt="owner profile"
            className="w-full max-w-md h-auto object-contain md:scale-92 rounded-3xl shadow-[0px_0px_100px_10px_rgba(255,223,176,0.2)]"
          />
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
