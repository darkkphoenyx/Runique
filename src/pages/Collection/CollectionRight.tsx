import CollectionCard from "./CollectionCard";
import { useProductStore } from "@/zustand/store";
import CollectionCardSkeleton from "../../components/skeletons/CollectionCardSkeleton";

interface CollectionRightProps {
  isLoading: boolean;
}

const CollectionRight = ({ isLoading }: CollectionRightProps) => {
  const productData = useProductStore((state) => state.productData);

  const renderSkeletons = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <CollectionCardSkeleton key={index} />
    ));
  };

  return (
    <div>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-x-4 gap-y-16">
        {isLoading
          ? renderSkeletons()
          : productData.map((card) => (
              <CollectionCard key={card.title} data={card} />
            ))}
      </div>

      {!isLoading && productData.length === 0 && (
        <div className="h-screen -mt-20 flex items-center justify-center text-gray-500">
          No Item
        </div>
      )}

      {!isLoading && productData.length <= 3 && <div className="h-60"></div>}
    </div>
  );
};

export default CollectionRight;
