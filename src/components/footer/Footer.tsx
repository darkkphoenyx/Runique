import { Link, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const footerData = [
  {
    id: 1,
    title: "Company",
    links: [
      {
        title: "About Runique",
        link: "/about",
      },
      {
        title: "News",
        link: "/news",
      },
      {
        title: "Careers",
        link: "/careers",
      },
      {
        title: "Investors",
        link: "/investors",
      },
    ],
  },
  {
    id: 2,
    title: "Help",
    links: [
      {
        title: "Get Help",
        link: "/getHelp",
      },
      {
        title: "Order Status",
        link: "/orderStatus",
      },
      {
        title: "Delivery",
        link: "/delivery",
      },
      {
        title: "Returns",
        link: "/returns",
      },
    ],
  },
  {
    id: 3,
    title: "Resources",
    links: [
      {
        title: "Find A Store",
        link: "/findStore",
      },
      {
        title: "Become a Member",
        link: "/becomeMember",
      },
      {
        title: "Product",
        link: "/product",
      },
      {
        title: "Send Us Feedback",
        link: "/feedback",
      },
    ],
  },
];
const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 200);
  };
  return (
    <div className="bg-[#fcfbfa] pb-4 mt-auto">
      <div className="py-15 grid lg:grid-cols-2">
        <Link to={"/"} onClick={() => handleNavigation("/")}>
          <div className="flex lg:justify-start justify-center">
            <img
              src="/assets/Logo/RuniqueLogo.png"
              alt="Logo"
              className="lg:h-50 md:h-40 h-32"
            />
          </div>
        </Link>

        {/* footer nav */}
        <div className="md:flex space-x-32 mx-auto hidden">
          {footerData.map((nav) => (
            <div key={nav.id}>
              <h2 className="text-black font-medium">{nav.title}</h2>
              <ul className="mt-8 flex gap-4 flex-col">
                {nav.links.map((link) => (
                  <Link
                    key={link.link}
                    to={link.link}
                    onClick={() => handleNavigation(link.link)}
                  >
                    <li className="text-gray-600 hover:text-gray-800">
                      {link.title}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* mobile accordian */}
        <Accordion
          type="single"
          collapsible
          className="w-full block md:hidden px-4 space-y-2 mt-8"
        >
          {footerData.map((nav) => (
            <AccordionItem key={nav.id} value={nav.title}>
              <AccordionTrigger className="group font-medium w-full text-start p-3 hover:no-underline  rounded-md flex justify-between items-center text-base">
                {nav.title}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 px-4">
                {nav.links.map((link) => (
                  <Link
                    key={link.link}
                    to={link.link}
                    className="text-gray-600 py-1 hover:text-gray-800"
                  >
                    {link.title}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {/* footer bottom section */}
      <div className="px-4 flex md:flex-row flex-col md:gap-12 gap-4 w-full lg:mt-10 md:mt-4 mt-4 text-sm items-center justify-center">
        <h2 className="font-normal tracking-normal text-gray-600">
          &copy; 2025 Runique, Inc. All rights reserved
        </h2>
        <ul className="flex gap-12 md:text-sm text-xs">
          <li className="text-gray-600 hover:text-black cursor-pointer">
            Terms of Sales
          </li>
          <li className="text-gray-600 hover:text-black cursor-pointer">
            Terms of Use
          </li>
          <li className="text-gray-600 hover:text-black cursor-pointer">
            Privacy Policy
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
