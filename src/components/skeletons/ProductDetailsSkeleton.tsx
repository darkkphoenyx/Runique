import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailsSkeleton = () => {
  return (
<div className="grid md:grid-cols-2 justify-center items-center gap-18 max-w-[900px] mx-auto pt-[40px]">
      <Skeleton className="lg:h-[435px] lg:w-[435px] md:h-[360px] h-[150px] bg-gray-200 rounded-lg" />
      <div className="space-y-2 mt-2">
        <Skeleton className="h-4 md:w-[150px] w-[100px] bg-gray-200" />
        <Skeleton className="md:h-5 h-8 md:w-[250px] w-[150px] bg-gray-200" />
        <Skeleton className="h-4 md:w-[160px] w-[140px] bg-gray-200" />
        <Skeleton className="h-4 w-[100px] bg-gray-200" />
        <Skeleton className="h-6 mt-4 md:w-[150px] w-[120px] bg-gray-200" />
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
