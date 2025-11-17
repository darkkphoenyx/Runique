import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen pb-10 overflow-hidden">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>
      {/* trending skeleton */}
      <div className="bg-white p-2 rounded shadow-2xl w-full h-[80vh] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        <h2 className="font-medium text-2xl mb-4">Trending Products</h2>

        <div className="flex items-end gap-2 h-[90%] bg-gray-100 p-4">
          {Array(10)
            .fill(null)
            .map((_, idx) => {
              const barHeight = Math.floor(Math.random() * 40) + 50;
              return (
                <div
                  key={idx}
                  className={cn(
                    `w-30 rounded animate-pulse ${
                      idx % 2 === 0 ? "bg-gray-300" : "bg-gray-400"
                    } duration-200`
                  )}
                  style={{
                    height: `${barHeight}%`,
                    animationDelay: `${idx * 0.15}s`,
                  }}
                />
              );
            })}
        </div>
      </div>

      {/* best selling and most favourite skeleton */}
      <div className="grid lg:grid-cols-2 lg:mt-20 mt-14 lg:gap-10 max-lg:gap-y-14 w-full">
        <TempSkeleton title="Best Selling Items" />
        <TempSkeleton title="Most Favourite Items" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;

const TempSkeleton = ({ title }: { title: string }) => {
  return (
    <div>
      <h2 className="font-medium text-2xl mb-4 w-full">{title}</h2>
      <div className="grid grid-cols-2 gap-10">
        {Array(6)
          .fill(null)
          .map((_, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <Skeleton className="w-full h-[150px] bg-gray-200" />
              <Skeleton className="w-full h-6 bg-gray-200" />
              <Skeleton className="w-full h-4 bg-gray-200" />
            </div>
          ))}
      </div>
    </div>
  );
};
