import CollectionRight from "./CollectionRight";
import { useEffect } from "react";
import products from "@/appwrite/APIs";
import { useProductStore } from "@/zustand/store";
import CollectionSidebar from "@/components/collections/sidebar/Sidebar";

const CollectionWrapper = () => {
  const setProductData = useProductStore((state) => state.setProductData);
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await products.getProductDetails({});
        const data: any = res?.documents || [];
        setProductData(data);
      } catch (error) {
        console.log("Failed to fetch Product details:: ", error);
      }
    };
    fetchProductData();
  }, []);
  return (
    <div className="pt-[100px] grid lg:grid-cols-12 max-w-[1500px] mx-auto pb-10">
      <div className="col-span-2  hidden lg:block">
        <CollectionSidebar />
      </div>
      <div className="col-span-10 pt-3 lg:-ml-12 px-4 lg:px-0 ">
        <CollectionRight />
      </div>
    </div>
  );
};

export default CollectionWrapper;
