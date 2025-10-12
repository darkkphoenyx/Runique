import { fetchProductDetail } from "@/utils/FetchProductDetails";
import { useProductStore } from "@/zustand/store";
import { useEffect, useState } from "react";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

type FavouriteProductCardProps = {
  productId: string;
};

const FavouriteProductCard = ({ productId }: FavouriteProductCardProps) => {
  const productData = useProductStore((state) => state.productData);
  const CardData = productData.find((item) => item.id === productId);
  const setProductData = useProductStore((state) => state.setProductData);
  const navigate = useNavigate();

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    const loadProductStore = async () => {
      try {
        const res = await fetchProductDetail(selectedFilters);
        console.log("inside card", res);
        setProductData(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (productData.length === 0) {
      loadProductStore();
      setSelectedFilters({});
    }
  }, []);

  const handleProductNavigation = (slug: any) => {
    navigate(`/p/${encodeURIComponent(slug)}`);
  };

  return (
    <div className="flex flex-col gap-2 items-center px-2 h-full">
      <div className="flex md:gap-4 gap-2 w-full h-full lg:p-2 p-1">
        <Card
          // onClick={() => handleProductNavigation(CardData?.slug)}
          className="p-0 rounded-none gap-0 h-full shadow-none transition-all duration-300 border-none"
        >
          <img
            className="w-auto max-h-[500px] object-cover"
            src={CardData?.imgUrl[0]}
            alt="card image"
          />
          <div className="space-y-1 my-2">
            <CardTitle className="font-medium md:text-2xl text-lg leading-normal">
              {CardData?.title}
            </CardTitle>
            <CardDescription className="md:text-base text-xs">
              {CardData?.type}
            </CardDescription>
            <CardDescription className="md:text-base text-sm">
              {CardData?.colorAvailable.length} Colour
            </CardDescription>
          </div>
          <p className="font-semibold mt-auto text-red-600">
            Rs. {CardData?.price}
          </p>
        </Card>
      </div>
      <button
        className="bg-black hover:bg-white mt-6 rounded-lg font-medium active:scale-[98%] hover:text-black border-black transition-all cursor-pointer w-full text-white border py-2 md:text-base text-xs"
        onClick={() => handleProductNavigation(CardData?.slug)}
      >
        View More
      </button>
    </div>
  );
};

export default FavouriteProductCard;
