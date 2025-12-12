import { useEffect, useState } from "react";

import ProductBarChart from "@/components/admin/ProductBarCharts";
import ProductCard from "@/components/admin/ProductCard";
import products from "@/appwrite/APIs";
import DashboardSkeleton from "@/components/admin/DashboardSkeleton";

const AdminDashboard = () => {
  const [trending, setTrending] = useState<any[]>([]);
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        setLoading(true);
        const trendingData = await products.getTrendingProductsGraph();
        const bestSellersData = await products.getBestSellers();
        const recommendedData = await products.getMostFavourited();
        setTrending(trendingData);
        setBestSellers(bestSellersData);
        setRecommended(recommendedData);
      } catch (error) {
        console.error("Data fetched error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharts();
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen pb-10">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>
      <ProductBarChart data={trending} title="Trending Products" />
      <div className="grid lg:grid-cols-2 lg:mt-20 mt-14 lg:gap-10 max-lg:gap-y-14">
        <div className="shadow-2xl p-2">
          <h2 className="font-medium text-2xl mb-4 p-2">Best Selling Items</h2>
          <div className="grid lg:grid-cols-2 grid-cols-2 gap-4">
            {bestSellers.map((product, idx) => (
              <ProductCard key={idx} data={product} />
            ))}
          </div>
        </div>
        <div className="shadow-2xl p-2">
          <h2 className="font-medium text-2xl mb-4 p-2">Most Favourite Items</h2>
          <div className="grid lg:grid-cols-2 grid-cols-2 gap-2">
            {recommended.map((product, idx) => (
              <ProductCard key={idx} data={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
