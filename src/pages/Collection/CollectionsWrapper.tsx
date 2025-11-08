import { useEffect, useState } from "react";
import CollectionRight from "./CollectionRight";
import { useProductStore } from "@/zustand/store";
import CollectionSidebar from "@/components/collections/sidebar/CollectionSidebar";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ScrollToTopOnRouteChange from "@/utils/ScrollToTopOnRouteChange";
import CollectionBreadcrumb from "./CollectionBreadCrumb";
import { fetchProductDetail } from "@/utils/FetchProductDetails";

const CollectionWrapper = () => {
  const setProductData = useProductStore((state) => state.setProductData);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setIsLoading(true);
      try {
        const mappedData = await fetchProductDetail(selectedFilters);
        setProductData(mappedData);
      } catch (error) {
        console.error("Failed to fetch filtered products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [selectedFilters, setProductData]);

  return (
    <>
      <div className="md:pt-[100px] pt-[70px] flex max-w-[1600px] mx-auto pb-10 transition-all duration-500 px-4">
        {/* Sidebar on Desktop */}
        <ScrollToTopOnRouteChange />
        <div className="hidden lg:block w-[20%] pr-4">
          <CollectionSidebar
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>

        {/* Main content area */}
        <div className="w-full pt-3 lg:px-0 transition-all duration-500 ease-in-out">
          {/* Filter button on Mobile */}
          <div className="py-4 lg:hidden flex justify-between items-center">
            <CollectionBreadcrumb />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Filters <SlidersHorizontal size={18} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] px-4">
                <div className="mt-12">
                  <CollectionSidebar
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Products section */}
          <CollectionRight isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};

export default CollectionWrapper;
