import CollectionCard from "./CollectionCard";
import { useProductStore } from "@/zustand/store";
import CollectionCardSkeleton from "../../components/skeletons/CollectionCardSkeleton";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface CollectionRightProps {
  isLoading: boolean;
}

const CollectionRight = ({ isLoading }: CollectionRightProps) => {
  const productData = useProductStore((state) => state.productData);

  //search functionality
  const searchQuery = useProductStore((state) => state.searchQuery);
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return productData;
    return productData.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [productData, searchQuery]);

  const renderSkeletons = () => {
    return Array.from({ length: 9 }).map((_, index) => (
      <CollectionCardSkeleton key={index} />
    ));
  };

  return (
    <div
      className={cn(
        `${
          productData.length === 0 ||
          (filteredProducts.length === 0 && "h-[70vh]")
        }`
      )}
    >
      <div className="relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full border rounded-md px-3 py-2 pr-8 outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-2 gap-x-4 gap-y-16 mt-8">
        {isLoading ? (
          renderSkeletons()
        ) : searchQuery.trim() ? (
          filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <CollectionCard isAdmin key={product.id} data={product} />
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full lg:h-[350px]">
              No products found.
            </p>
          )
        ) : productData.length > 0 ? (
          productData.map((card) => (
            <CollectionCard isAdmin key={card.id} data={card} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full lg:h-[350px]">
            No Item
          </p>
        )}
      </div>

      {!isLoading && productData.length <= 3 && <div className="h-60"></div>}
    </div>
  );
};

export default CollectionRight;
