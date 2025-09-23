import { Skeleton } from "@/components/ui/skeleton";

const CollectionCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="lg:h-[530px] md:h-[450px] h-[205px] bg-gray-200 rounded-none" />
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

export default CollectionCardSkeleton;
