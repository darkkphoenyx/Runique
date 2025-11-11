import CollectionCardSkeleton from "@/components/skeletons/CollectionCardSkeleton";
import CollectionCard from "@/pages/Collection/CollectionCard";
import { fetchProductDetail } from "@/utils/FetchProductDetails";
import { useProductStore } from "@/zustand/store";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const productData = useProductStore((state) => state.productData);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const setProductData = useProductStore((state) => state.setProductData);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

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

  // load the store
  useEffect(() => {
    setSelectedFilters({});
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetchProductDetail(selectedFilters);
        setProductData(res);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleAddProduct = () => {
    navigate("/admin/add-products");
  };

  return (
    <>
      {/* add product */}
      <div className="sticky top-17 h-fit bg-white pt-4 z-20">
        <div className="flex items-center justify-between mb-4 ">
          <h2 className="md:text-sm text-xs text-gray-500">
            Manage all your products here.
          </h2>
          <button
            onClick={() => handleAddProduct()}
            className="bg-red-600 flex gap-2 md:px-4 px-3 py-2 rounded-full text-white font-medium shadow-2xl cursor-pointer transition-all active:scale-[97%] max-md:text-xs items-center"
          >
            <Plus />
            Add Item
          </button>
        </div>

        {/* search and filter */}

        <div className="relative pb-4">
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
            <p className="text-center text-gray-400 col-span-full">
              No products found.
            </p>
          )
        ) : productData.length > 0 ? (
          productData.map((card) => (
            <CollectionCard isAdmin key={card.id} data={card} />
          ))
        ) : (
          <div className="h-screen -mt-20 flex items-center justify-center text-gray-500">
            No Item
          </div>
        )}
      </div>

      {!isLoading && productData.length === 0 && (
        <div className="h-screen -mt-20 flex items-center justify-center text-gray-500">
          No Item
        </div>
      )}

      {!isLoading && productData.length <= 3 && <div className="h-60"></div>}
    </>
  );
};

export default Products;
