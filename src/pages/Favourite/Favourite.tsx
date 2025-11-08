import Footer from "@/components/footer/Footer";
import { useProductStore } from "@/zustand/store";
import FavouriteProductCard from "./FavouriteProductCard";

const Favourite = () => {
  const favouriteData = useProductStore((state) => state.favouriteData);

  return (
    <div className="flex flex-col h-screen lg:pt-28 pt-20">
      {favouriteData.length > 0 ? (
        <div className="grid lg:grid-cols-3 grid-cols-2 mx-auto md:gap-4 mb-16">
          {favouriteData.map((item, idx) => (
            <FavouriteProductCard key={idx} data={item} />
          ))}
        </div>
      ) : (
        <div className="col-span-2 h-[450px] mb-16 flex items-center max-lg:justify-center flex-col">
          <h2 className="text-2xl font-medium">Favourite</h2>
          <p className="ml-2">There are no items in Favourite.</p>
        </div>
      )}
      <div className="mt-auto hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default Favourite;
