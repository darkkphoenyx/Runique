import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PhotoCarousel = ({ images }: { images: string[] }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mx-auto relative"
    >
      <CarouselContent className="mt-4">
        {images.map((image, index) => (
          <CarouselItem className="md:basis-1/2" key={index}>
            <div className="p-1 cursor-pointer">
              <Card className="p-0 rounded-xl">
                <img src={image} alt={`${index}image`} className="rounded-xl" />
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-[50%] md:left-20 left-10 h-10  w-10 transform shadow-2xl bg-white" />
      <CarouselNext className="absolute top-[50%] md:right-20 right-10 h-10  w-10 transform" />
    </Carousel>
  );
};

export default PhotoCarousel;
