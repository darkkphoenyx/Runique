import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IProductCard } from "@/interfaces/IProduct";
import { useProductStore } from "@/zustand/store";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import products from "@/appwrite/APIs";
import ProductDetailsSkeleton from "@/components/skeletons/ProductDetailsSkeleton";
import ShoesSizeGrid from "./ShoesSizeGrid";
import PhotoCarousel from "./PhotoCarousel";
import ProductExtraDetails from "./ProductExtraDetails";
import RelatedProducts from "./RelatedProducts";
import ProductBreadcrumb from "./ProductBreadCrumb";

const mapApiResponseToProductCard = (res: IProductCard): IProductCard => ({
  id: res.id,
  title: res.title,
  description: res.description,
  imgUrl: res.imgUrl,
  header: res.header,
  colorAvailable: res.colorAvailable,
  price: res.price,
  sizes: res.sizes,
  gender: res.gender,
  categories: res.categories,
  type: res.type,
  slug: res.slug,
});

const ProductDetailWrapper = () => {
  const { slug } = useParams<{ slug: string }>();
  const productData = useProductStore((state) => state.productData);

  const [data, setData] = useState<IProductCard | undefined>();
  const [activeImageUrl, setActiveImageUrl] = useState<string>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (data?.imgUrl?.length) {
      setActiveImageUrl(data.imgUrl[0]);
    }
  }, [data]);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;

    const loadProduct = async () => {
      const localProduct = productData.find((item) => item.slug === slug);

      if (localProduct) {
        setData(localProduct);
        return;
      }

      try {
        const res: any = await products.getProductByTitle(slug);
        if (isMounted && res) {
          setData(mapApiResponseToProductCard(res));
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        if (isMounted) setData(undefined);
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [slug, productData]);

  const handleImageClick = useCallback((url: string) => {
    setActiveImageUrl(url);
  }, []);

  if (!data) {
    return (
      <div className="pt-[100px] text-center h-screen">
        <ProductDetailsSkeleton />
      </div>
    );
  }

  return (
    <div className="md:pt-[100px] pt-[80px] px-4 h-full">
      <div className="hidden md:block">
        <ProductBreadcrumb title={data.title} />
      </div>
      <div className="grid lg:grid-cols-2 justify-center max-w-[1000px] mx-auto mb-10">
        {/* Left Section - Image Gallery */}
        <div className="w-full hidden border-none h-fit sticky top-10 lg:flex max-md:justify-center shadow-none p-0 rounded-lg">
          <div className="flex w-[20%] flex-col gap-2 sticky h-fit top-10">
            {data.imgUrl.map((image) => (
              <div key={image} className="relative h-14 w-14">
                {activeImageUrl === image && (
                  <div className="absolute top-0 left-0 h-full w-full bg-black/40 rounded-lg z-10" />
                )}
                <img
                  onClick={() => handleImageClick(image)}
                  className="h-14 w-14 cursor-pointer object-cover rounded-lg"
                  src={image}
                  alt={data.title}
                />
              </div>
            ))}
          </div>
          <img
            className="lg:h-[530px] md:h-[400px] h-auto w-[430px] object-cover rounded-lg border"
            src={
              activeImageUrl ||
              data.imgUrl[0] ||
              "https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg"
            }
            alt={data.title}
          />
        </div>

        {/* Right Section - Product Info */}
        <Card className="border-none shadow-none p-0 gap-0 lg:w-[90%] w-[100%] mx-auto">
          <div>
            <CardHeader className="text-red-600 font-medium p-0 md:text-sm text-xs">
              {data.header}
            </CardHeader>
            <CardTitle className="text-xl -mt-2">{data.title}</CardTitle>
            <CardDescription className="text-sm">{data.type}</CardDescription>
            <p className="mt-2 text-lg  font-medium text-red-600">
              Rs. {data.price}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Inclusive of all taxes <br />
              (Also includes all applicable duties)
            </p>
          </div>

          {/* only tablet and mobile view */}
          <div className="block lg:hidden">
            <PhotoCarousel images={data.imgUrl} />
          </div>

          {/* product booking is here */}
          <ShoesSizeGrid
            price={data.price}
            productId={data.id}
            sizeData={data.sizes}
          />

          {/* description and color options */}
          <div className="mt-8">
            <CardDescription className="text-base text-black">
              {data.description ? (
                data.description
              ) : (
                <p className="text-center text-sm text-gray-500 mb-8">
                  This product is excluded from site <br /> promotions and
                  discounts.
                </p>
              )}
            </CardDescription>

            <div className="flex gap-8 mt-8 font-medium">
              <p>Colors Available:</p>
              <ul className="list-disc ml-5">
                {data.colorAvailable.map((color) => (
                  <li key={color}>{color}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* extra details accordion*/}
          <ProductExtraDetails />
        </Card>
      </div>

      {/* related products */}
      {data.categories && (
        <div>
          <RelatedProducts category={data.categories} slug={data.slug} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailWrapper;
