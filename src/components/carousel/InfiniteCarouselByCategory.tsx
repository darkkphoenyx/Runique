import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "@/zustand/store";
import { useEffect } from "react";
import products from "@/appwrite/APIs";

const InfiniteCarouselByCategory = ({ category }: { category: string }) => {
  const featuredProductData = useProductStore(
    (state) => state.featuredProductData
  );
  const setFeaturedProductData = useProductStore(
    (state) => state.setFeaturedProductData
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatureProducts = async () => {
      try {
        const res: any = await products.getProductsByCategoryName(category);
        setFeaturedProductData(res);
      } catch (error) {
        console.error("Error fetching data:: ", error);
      }
    };
    fetchFeatureProducts();
  }, []);

  const handleNavigation = (title: string) => {
    navigate(`/p/${encodeURIComponent(title)}`);
  };
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
        {featuredProductData.map((card) => (
          <CarouselItem key={card.title} className="md:basis-1/3 lg:basis-1/5">
            <div
              onClick={() => handleNavigation(card.title)}
              className="p-1 cursor-pointer"
            >
              <Card className="p-0 rounded-2xl">
                <CardContent
                  className="flex aspect-square items-center justify-center p-6 rounded-2xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.imgUrl})` }}
                >
                  <p className="text-white text-center text-lg mt-auto font-medium">
                    {card.title}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-[60%] md:left-20 left-10 h-10  w-10 transform shadow-2xl bg-white" />
      <CarouselNext className="absolute top-[60%] md:right-20 right-10 h-10  w-10 transform" />
    </Carousel>
  );
};

export default InfiniteCarouselByCategory;
