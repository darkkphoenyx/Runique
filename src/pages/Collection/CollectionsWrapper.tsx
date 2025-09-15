// CollectionWrapper.tsx

import { useEffect, useState } from "react";
import CollectionRight from "./CollectionRight";
import products from "@/appwrite/APIs";
import { useProductStore } from "@/zustand/store";
import CollectionSidebar from "@/components/collections/sidebar/Sidebar";

const CollectionWrapper = () => {
  const setProductData = useProductStore((state) => state.setProductData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      try {
        const res = await products.getProductDetails({});
        const data: any = res?.documents || [];
        setProductData(data);
      } catch (error) {
        console.log("Failed to fetch Product details:: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, []);

  return (
    <div className="pt-[100px] grid lg:grid-cols-12 max-w-[1500px] mx-auto pb-10">
      <div className="col-span-2 hidden lg:block">
        <CollectionSidebar />
      </div>
      <div className="col-span-10 pt-3 lg:-ml-12 px-4 lg:px-0">
        <CollectionRight isLoading={isLoading} />
      </div>
    </div>
  );
};

export default CollectionWrapper;
