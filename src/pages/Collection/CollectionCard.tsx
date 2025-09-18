import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IProductCard } from "@/interfaces/IProduct";
import { useNavigate } from "react-router-dom";

const CollectionCard = ({ data }: { data: IProductCard }) => {
  const navigate = useNavigate();
  const handleProductNavigation = (title: string) => {
    navigate(`/p/${encodeURIComponent(title)}`);
  };
  return (
    <Card
      onClick={() => handleProductNavigation(data.title)}
      className="p-0 rounded-none gap-0 border-none shadow-none cursor-pointer active:scale-[98%] transition-all duration-300"
    >
      <img
        className="w-full min-h-max object-cover"
        src={data.imgUrl[0]}
        alt="card image"
      />
      <CardHeader className="md:mt-3 mt-2 text-red-600 font-medium p-0 max-sm:text-xs">
        {data.header}
      </CardHeader>
      <div className="space-y-1 mb-2">
        <CardTitle className="font-medium  leading-normal">
          {data.title}
        </CardTitle>
        <CardDescription className="md:text-base text-xs">
          {data.type}
        </CardDescription>
        <CardDescription className="md:text-base text-sm">
          {data.colorAvailable.length} Colour
        </CardDescription>
      </div>
      <p className="font-semibold mt-auto">MRP : {data.price}</p>
    </Card>
  );
};

export default CollectionCard;
