import { useEffect, useState } from "react";
import CollectionRight from "./CollectionRight";
import products from "@/appwrite/APIs";
import { useProductStore } from "@/zustand/store";
import CollectionSidebar from "@/components/collections/sidebar/Sidebar";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const CollectionWrapper = () => {
  const setProductData = useProductStore((state) => state.setProductData);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOn, setIsFilterOn] = useState(false); // Optional if needed

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
    <div className="md:pt-[100px] pt-[70px] flex max-w-[1600px] mx-auto pb-10 transition-all duration-500 px-4">
      {/* Sidebar on Desktop */}
      <div className="hidden md:block w-[20%] pr-4">
        <CollectionSidebar />
      </div>

      {/* Main content area */}
      <div className="w-full pt-3 lg:px-0 transition-all duration-500 ease-in-out">
        {/* Filter button on Mobile */}
        <div className="py-4 md:hidden flex justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Filters <SlidersHorizontal size={18} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] px-4">
              <div className="mt-12">
                <CollectionSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Products section */}
        <CollectionRight isLoading={isLoading} />
      </div>
    </div>
  );
};

export default CollectionWrapper;
