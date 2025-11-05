import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import type { IFavourite } from "@/interfaces/IFavourites";
import { Heart } from "lucide-react";
import products from "@/appwrite/APIs";
import { useProductStore } from "@/zustand/store";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type FavouriteProductCardProps = {
  data: IFavourite;
};

const FavouriteProductCard = ({ data }: FavouriteProductCardProps) => {
  const navigate = useNavigate();
  const setFavouriteData = useProductStore((state) => state.setFavouriteData);

  const handleProductNavigation = (slug: any) => {
    navigate(`/p/${encodeURIComponent(slug)}`);
  };

  const removeFavourite = async (userId: string, productId: string) => {
    try {
      await products.deleteFavourite(userId, productId);
      const favouriteData: any = await products.getFavourites();
      setFavouriteData(favouriteData.documents);
      toast.success("Favourite removed");
    } catch (error) {
      toast.error("Failed to remove favourite");
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center px-2 h-full">
      <div className="flex md:gap-4 gap-2 w-full h-full lg:p-2 p-1">
        <Card className="p-0 rounded-none gap-0 h-full shadow-none transition-all duration-300 border-none w-full">
          <div className="relative w-full">
            <img
              className="w-full max-h-[500px] object-cover"
              src={data?.productImage}
              alt="card image"
            />
            <AlertDialog>
              <AlertDialogTrigger>
                <Heart
                  fill="red"
                  className="text-red-500 bg-white h-10 w-10 p-2 rounded-full hover:scale-[105%] cursor-pointer transition-all absolute right-2 top-2"
                />
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Toggle Favourite</AlertDialogTitle>
                  <AlertDialogDescription>
                    Remove this item from Favourite
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="hover:bg-black hover:text-white">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 hover:bg-black"
                    onClick={() => removeFavourite(data.userId, data.productId)}
                  >
                    Remove from Favourite
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="space-y-1 my-2">
            <CardTitle className="font-medium md:text-2xl text-lg leading-normal">
              {data?.productName}
            </CardTitle>
            <CardDescription className="md:text-base text-xs">
              {data?.type}
            </CardDescription>
            <CardDescription className="md:text-base text-sm">
              {data?.color} Colour
            </CardDescription>
          </div>
          <p className="font-semibold mt-auto text-red-600">
            Rs. {data?.price}
          </p>
        </Card>
      </div>
      <button
        className="bg-black hover:bg-white mt-6 rounded-lg font-medium active:scale-[98%] hover:text-black border-black transition-all cursor-pointer w-full text-white border py-2 md:text-base text-xs"
        onClick={() => handleProductNavigation(data?.slug)}
      >
        View More
      </button>
    </div>
  );
};

export default FavouriteProductCard;
