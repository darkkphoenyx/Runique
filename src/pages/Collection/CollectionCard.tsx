import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IProductCard } from "@/interfaces/IProduct";

const CollectionCard = ({ data }: { data: IProductCard }) => {
  return (
    <Card className="p-0 rounded-none gap-0 border-none shadow-none cursor-pointer active:scale-[98%] transition-all duration-300">
      <img
        className="w-full h-full object-cover"
        src={data.imgUrl}
        alt="card image"
      />
      <div className="mt-4 space-y-1">
        <CardHeader className="text-red-600 font-medium p-0">
          {data.header}
        </CardHeader>
        <CardTitle className="font-medium">{data.title}</CardTitle>
        <CardDescription className="text-base">
          {data.description}
        </CardDescription>
        <CardDescription className="text-base">
          {data.colorAvailable.length} Colour
        </CardDescription>
        <p className="font-semibold mt-2">MRP : {data.price}</p>
      </div>
    </Card>
  );
};

export default CollectionCard;
