import products from "@/appwrite/APIs";
import { useEffect, useState } from "react";

export default function TrendingProducts() {
  const [trendingProducts, setTrendingProducts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await products.getTrendingProducts();
      setTrendingProducts(res);
    })();
  }, []);

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <h2 className="font-semibold text-lg mb-4">🔥 Top Trending Products</h2>
      <ul className="space-y-2">
        {trendingProducts.map((p) => (
          <li key={p.$id} className="flex justify-between">
            <span>{p.name || "Unnamed Product"}</span>
            <span className="font-medium">{(p.score * 100).toFixed(0)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
