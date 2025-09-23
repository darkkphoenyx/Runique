import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailsSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-2 lg:justify-center lg:max-w-[1000px] w-full mx-auto pt-[38px]">
      <div className="gap-5 hidden lg:flex">
        <div className="space-y-2">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className="w-14 h-14 bg-gray-200" />
            ))}
        </div>
        <Skeleton className="lg:h-[530px] lg:w-[600px] md:h-[360px] h-[150px] bg-gray-200 rounded-lg" />
      </div>
      <div className="space-y-2 mt-2 lg:ml-6 ml-4">
        <Skeleton className="h-3 md:w-[80px] w-[100px] bg-gray-200" />
        <Skeleton className="md:h-5 h-8 md:w-[300px] w-[150px] bg-gray-200" />
        <Skeleton className="h-3 md:w-[80px] w-[140px] bg-gray-200" />
        <Skeleton className="h-5 mt-4 w-[100px] bg-gray-200" />
        <Skeleton className="h-3 mt-2 md:w-[120px] w-[120px] bg-gray-200" />
        <Skeleton className="h-3 w-[200px] bg-gray-200" />
        <Skeleton className="hidden lg:block h-3 mt-10 md:w-[100px] w-[120px] bg-gray-200" />
        <div className="lg:grid hidden grid-cols-2 gap-2 mt-4 w-[95%]">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className="h-10 w-full bg-gray-200" />
            ))}
        </div>

        <div className="pr-4 grid md:grid-cols-2 gap-6 lg:hidden">
          <Skeleton className="md:h-[400px] h-[450px] mt-4 bg-gray-200" />
          <Skeleton className="h-[400px] md:block hidden mt-4 bg-gray-200" />
        </div>

        <div className="pr-4">
          <Skeleton className="lg:h-12 mt-10 h-3 lg:w-full w-[100px] bg-gray-200" />
          <Skeleton className="lg:block hidden h-12 mt-2 bg-gray-200" />
          <Skeleton className="lg:block hidden h-[240px] mt-12 bg-gray-200" />
          <div className="lg:hidden grid grid-cols-2 gap-2 mt-4">
            <Skeleton className="h-10  bg-gray-200" />
            <Skeleton className="h-10  bg-gray-200" />
            <Skeleton className="h-10  bg-gray-200" />
            <Skeleton className="h-10  bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
