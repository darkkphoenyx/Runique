import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";
import type { IInfiniteCarousel } from "@/interfaces/InfiniteCarousel";
import { Link } from "react-router-dom";

const CarouselData: IInfiniteCarousel[] = [
  {
    id: 1,
    photoLink: "http://localhost:5173/assets/Homepage/DontMiss/img1.jpg",
    link: "",
    text: "Air Jordan 1",
  },
  {
    id: 2,
    photoLink: "http://localhost:5173/assets/Homepage/DontMiss/img1.jpg",
    link: "",
    text: "Air Force 1",
  },
  {
    id: 3,
    photoLink: "http://localhost:5173/assets/Homepage/DontMiss/img1.jpg",
    link: "",
    text: "V2K",
  },
  {
    id: 4,
    photoLink: "",
    link: "",
    text: "Metcon",
  },
  {
    id: 5,
    photoLink: "",
    link: "",
    text: "Air Max Dn",
  },
  {
    id: 6,
    photoLink: "",
    link: "",
    text: "Blazer",
  },
  {
    id: 7,
    photoLink: "",
    link: "",
    text: "Dunk",
  },
  {
    id: 8,
    photoLink: "",
    link: "",
    text: "Cortez",
  },
];
const InfiniteCarousel = () => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mx-auto relative mt-20"
    >
      <h1
        data-aos="fade-right"
        data-aos-delay="30"
        className="md:text-5xl text-4xl md:px-20 md:text-start text-center font-semibold text-black"
      >
        Shop by Icons
      </h1>
      <CarouselContent className="mt-4">
        {CarouselData.map((card) => (
          <CarouselItem key={card.id} className="md:basis-1/3 lg:basis-1/5">
            <div className="p-1">
              <Link to={card.link}>
                <Card className="p-0 rounded-2xl">
                  <CardContent
                    className="flex aspect-square items-center justify-center p-6 rounded-2xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${card.photoLink})` }}
                  >
                    <p className="absolute flex items-center justify-center bg-black/50 text-white top-10 translate-x-[100px] font-medium h-8 w-8 rounded-full">
                      {card.id}
                    </p>
                    <p className="text-white text-lg mt-auto font-medium">
                      {card.text}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-[60%] md:left-20 left-10 h-10  w-10 transform shadow-2xl bg-white" />
      <CarouselNext className="absolute top-[60%] md:right-20 right-10 h-10  w-10 transform" />
    </Carousel>
  );
};

export default InfiniteCarousel;
