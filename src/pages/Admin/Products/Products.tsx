import CollectionCardSkeleton from "@/components/skeletons/CollectionCardSkeleton";
import CollectionCard from "@/pages/Collection/CollectionCard";
import { useProductStore } from "@/zustand/store";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffectOnce } from "react-use";

const Products = () => {
  const productData = useProductStore((state) => state.productData);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffectOnce(() => {
    const id = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(id);
  });
  const renderSkeletons = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <CollectionCardSkeleton key={index} />
    ));
  };

  const handleAddProduct = () => {
    navigate("/admin/add-products");
  };

  return (
    <>
      {/* add product */}
      <div className="sticky top-17 h-fit bg-white pt-4">
        <div className="flex items-center justify-between mb-4">
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
        <div className="grid md:grid-cols-12 items-center gap-2 rounded-xl p-4 shadow-md">
          <div className="col-span-4 border p-4 rounded-lg">Search</div>
          <div className="col-span-2 border p-4 rounded-lg text-center">
            Gender
          </div>
          <div className="col-span-2 border p-4 rounded-lg text-center">
            Kids
          </div>
          <div className="col-span-2 border p-4 rounded-lg text-center">
            Price
          </div>
          <div className="col-span-2 border p-4 rounded-lg text-center">
            Latest
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-4 gap-y-16 mt-8">
        {isLoading
          ? renderSkeletons()
          : productData.map((card) => (
              <CollectionCard key={card.id} data={card} />
            ))}
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
