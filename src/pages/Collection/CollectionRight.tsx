import CollectionCard from "./CollectionCard";
import { useProductStore } from "@/zustand/store";

const CollectionRight = () => {
  //accessing the store
  const productData = useProductStore((state) => state.productData);
  return (
    <div>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-x-4 gap-y-16">
        {productData.map((card) => (
          <CollectionCard key={card.title} data={card} />
        ))}
      </div>
      {productData.length === 0 ? (
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      ) : (
        productData.length <= 3 && <div className="h-60"></div>
      )}
    </div>
  );
};

export default CollectionRight;
