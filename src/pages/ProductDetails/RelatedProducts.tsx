import products from "@/appwrite/APIs";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useProductStore } from "@/zustand/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RelatedProducts = ({
  category,
  slug,
}: {
  category: string;
  slug: string;
}) => {
  const featuredProductData = useProductStore(
    (state) => state.featuredProductData
  );
  const setFeaturedProductData = useProductStore(
    (state) => state.setFeaturedProductData
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedData = async () => {
      try {
        const res: any = await products.getRelatedProductsPerCategory(category);
        setFeaturedProductData(res);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
        setFeaturedProductData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedData();
  }, [category, setFeaturedProductData]);

  if (loading) {
    return <p className="px-4">Loading related products...</p>;
  }

  if (!featuredProductData || featuredProductData.length === 0) {
    return <p className="px-4">No related products found.</p>;
  }

  const handleNavigation = (slug: string) => {
    navigate(`/p/${encodeURIComponent(slug)}`);
  };

  return (
    <div className="lg:mt-28 md:mt-10 mt-16">
      <div>
        <h2 className="md:text-3xl text-2xl font-medium">
          You Might Also Like
        </h2>
        <ul>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full mx-auto relative border-b-2 pb-10 mb-10 mt-4"
          >
            <CarouselContent className="mt-4">
              {featuredProductData
                .filter((card) => card.slug !== slug)
                .map((card) => (
                  <CarouselItem
                    key={card.slug}
                    className="lg:basis-1/3 md:basis-1/2"
                  >
                    <div
                      onClick={() => handleNavigation(card.slug)}
                      className="p-1 cursor-pointer"
                    >
                      <Card className="p-0 rounded-xl border-none shadow-none">
                        <CardContent className="flex flex-col aspect-square  p-0 rounded-2xl bg-cover bg-center">
                          <img
                            className="rounded-xl"
                            src={card.imgUrl[0]}
                            alt={card.title}
                          />
                          <div className="mt-4">
                            <p className="text-black text-base mt-auto font-medium">
                              {card.title}
                            </p>
                            <CardDescription>{card.type}</CardDescription>
                            <p className="font-semibold">Rs: {card.price}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-[40%] md:left-20 left-10 h-10  w-10 transform shadow-2xl bg-white" />
            <CarouselNext className="absolute top-[40%] md:right-20 right-10 h-10  w-10 transform" />
          </Carousel>
        </ul>
      </div>
    </div>
  );
};

export default RelatedProducts;
