import products from "@/appwrite/APIs";
import { useProductStore } from "@/zustand/store";
import { useEffect, useState } from "react";
import CollectionCard from "../Collection/CollectionCard";
import { cn } from "@/lib/utils";

const Fyp = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const userData = useProductStore((state) => state.userData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true); // start loading
        const recs = await products.getRecommendations(userData?.id || "");
        setRecommendations(recs);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false); // stop loading after fetch
      }
    };

    fetchRecommendations();
  }, [userData?.id]); // add dependency if userData can change

  return (
    <div
      className={cn(
        `md:py-[100px] py-[70px] grid ${
          loading ? "grid-cols-1" : "lg:grid-cols-3 grid-cols-2"
        } gap-6 px-4`
      )}
    >
      {loading ? (
        <p className="mt-[100px] flex items-center justify-center w-full pb-[250px]">
          Hang on! We're preparing customized data for you.
        </p>
      ) : (
        recommendations.map((data, idx) => (
          <CollectionCard data={data} key={idx} />
        ))
      )}
    </div>
  );
};

export default Fyp;
