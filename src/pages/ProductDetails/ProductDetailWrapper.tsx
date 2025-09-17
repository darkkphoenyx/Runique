import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { IProductCard } from "@/interfaces/IProduct";
import { useProductStore } from "@/zustand/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from "@/appwrite/APIs";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ProductDetailsSkeleton from "@/components/skeletons/ProductDetailsSkeleton";
import ShoesSizeGrid from "./ShoesSizeGrid";

const mapApiResponseToProductCard = (res: any): IProductCard => {
  return {
    title: res.title,
    description: res.description,
    imgUrl: res.imgUrl,
    header: res.header,
    colorAvailable: res.colorAvailable,
    price: res.price,
    sizes: res.sizes,
    gender: res.gender,
    kids: res.kids,
  };
};

const ProductDetailWrapper = () => {
  const { title } = useParams<{ title: string }>();
  const [data, setData] = useState<IProductCard | undefined>();
  const productData = useProductStore((state) => state.productData);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!title) return;

    let isMounted = true;

    const matchedProduct = productData.find((item) => item.title === title);

    if (matchedProduct) {
      setData(matchedProduct);
    } else {
      const fetchProduct = async () => {
        try {
          const res = await products.getProductByTitle(title);
          if (isMounted) {
            if (res) {
              const mapped = mapApiResponseToProductCard(res);
              setData(mapped);
            } else {
              setData(undefined);
            }
          }
        } catch (error) {
          console.error("Failed to fetch product:", error);
          if (isMounted) setData(undefined);
        }
      };

      fetchProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [title, productData]);

  if (!data) {
    return (
      <div className="pt-[100px] text-center h-screen">
        <ProductDetailsSkeleton />
      </div>
    );
  }

  return (
    <div className="pt-[140px] min-h-screen px-4">
      <div className="grid md:grid-cols-2 justify-center gap-8 max-w-[900px] mx-auto">
        <div className="border-none flex max-md:justify-center w-full shadow-none p-0 rounded-lg">
          <img
            className="h-auto w-[520px] object-cover rounded-lg"
            src={data.imgUrl}
            alt={data.title}
          />
        </div>
        <Card className="border-none shadow-none p-0 gap-0 md:w-[90%] w-[100%] mx-auto">
          <div>
            <CardTitle className="md:text-xl text-lg">{data.title}</CardTitle>
            <CardDescription className="text-sm">
              {data.description}
            </CardDescription>
            <p className="mt-2 text-lg font-medium">MRP: {data.price}</p>
            <p className="mt-2 text-xs text-gray-500">
              Inclusive of all taxes <br />
              (Also includes all applicable duties)
            </p>
          </div>

          {/* size cards */}
          <ShoesSizeGrid sizeData={data.sizes} />

          <div className="mt-[40px] w-full border flex flex-col gap-y-2">
            <PrimaryButton
              title="Add to Bag"
              link=""
              className="bg-black text-white text-sm w-full py-6"
            />
            <PrimaryButton
              link=""
              title="Favourite"
              className="bg-white text-black text-sm border border-black w-full py-6"
            />
          </div>
          <div className="">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repudiandae perferendis consequuntur omnis sunt inventore velit
            mollitia dolore vel maxime maiores!
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailWrapper;
