import products from "@/appwrite/APIs";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchCartData } from "@/utils/FetchCartItem";
import { fetchProductDetail } from "@/utils/FetchProductDetails";
import { useProductStore } from "@/zustand/store";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

type BagProductCardProps = {
  id: string;
  productId: string;
  size: number;
  quantity: number;
  userId: string;
  price: number;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  removeFavourite: () => void;
  addToFavourite: () => void;
};

const BagProductCard = ({
  id,
  productId,
  size,
  quantity,
  userId,
  price,
  isSelected,
  onSelect,
  onDelete,
  removeFavourite,
  addToFavourite,
}: BagProductCardProps) => {
  const productData = useProductStore((state) => state.productData);
  const setBagData = useProductStore((state) => state.setBagData);
  const CardData = productData.find((item) => item.id === productId);
  const setProductData = useProductStore((state) => state.setProductData);
  const favouriteData = useProductStore((state) => state.favouriteData);

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const favourite = favouriteData.find((data) => data.productId === productId);

  useEffect(() => {
    const loadProductStore = async () => {
      try {
        const res = await fetchProductDetail(selectedFilters);
        setProductData(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (productData.length === 0) {
      loadProductStore();
      setSelectedFilters({});
    }
  }, []);
  const handleIncrease = async () => {
    if (quantity < 15) {
      try {
        await products.increaseQuantity(userId, productId, size, price);
        const updatedBagData = await fetchCartData(userId);
        setBagData(updatedBagData);
      } catch (error) {
        console.error("Failed to increase quantity:", error);
      }
    } else {
      toast.error("Limit exceeded", {
        description:
          "Sorry, you can only purchase allowable quantity of this product.",
      });
    }
  };

  const handleDecrease = async () => {
    if (quantity > 1) {
      try {
        await products.decreaseQuantity(userId, productId, size, price);
        const updatedBagData = await fetchCartData(userId);
        setBagData(updatedBagData);
      } catch (error) {
        console.error("Failed to decrease quantity:", error);
      }
    }
  };

  return (
    <div className="border flex gap-2 items-center px-2">
      <Checkbox
        id={id}
        checked={isSelected}
        onCheckedChange={onSelect}
        className="border-black/50 data-[state=checked]:bg-black h-5 w-5 cursor-pointer"
      />

      <div className="flex md:gap-4 gap-2 w-full lg:p-2 p-1">
        <div className="w-fit overflow-hidden">
          <img
            className="md:h-[150px] md:w-[150px] h-[100px] w-[100px] object-cover"
            src={CardData?.imgUrl[0]}
            alt="Product image"
          />
        </div>

        <div className="flex-1 flex gap-2 justify-between flex-wrap">
          <div>
            <h2 className="font-medium lg:text-lg max-md:text-sm">
              {CardData?.title}
            </h2>
            <p className="lg:text-sm text-xs font-medium lg:mt-4 mt-2">
              Size: {size}
            </p>
            <div className="lg:text-sm text-xs font-medium flex gap-2">
              Quantity:
              <div className="flex items-center">
                <button
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                  className={`border h-5 flex items-center w-5  ${
                    quantity <= 1
                      ? "cursor-not-allowed bg-gray-100 border-gray-100"
                      : "cursor-pointer bg-gray-200 border-gray-200"
                  }`}
                >
                  <Minus
                    className={`${quantity <= 1 ? "text-gray-400" : ""}`}
                  />
                </button>
                <input
                  type="text"
                  value={quantity}
                  className="w-6 min-w-4 text-center outline-none"
                  readOnly
                />
                <button
                  onClick={handleIncrease}
                  disabled={quantity >= 15}
                  className={`border h-5 flex items-center w-5 ${
                    quantity >= 15
                      ? "cursor-not-allowed bg-gray-100 border-gray-100"
                      : "cursor-pointer bg-gray-200 border-gray-200"
                  }`}
                >
                  <Plus
                    className={`${quantity >= 15 ? "text-gray-400" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex lg:w-fit w-full max-md:items-center lg:flex-col max-lg:justify-between max-lg:mt-auto">
            <p className="font-medium lg:text-lg text-sm">
              Rs. {CardData?.price}
            </p>

            <div className="flex gap-3 lg:mt-4 text-gray-500">
              {/* Toggle Favourite */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Heart
                    fill={favourite ? "red" : "transparent"}
                    className={cn(
                      `${
                        favourite && "text-red-500"
                      } hover:text-red-500 cursor-pointer block lg:hidden`
                    )}
                    size={18}
                  />
                </AlertDialogTrigger>
                <AlertDialogTrigger asChild>
                  <Heart
                    fill={favourite ? "red" : "transparent"}
                    className={cn(
                      `${
                        favourite && "text-red-500"
                      } hover:text-red-500 cursor-pointer hidden lg:block`
                    )}
                  />
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Toggle Favourite</AlertDialogTitle>
                    <AlertDialogDescription>
                      {favourite
                        ? "Remove this item from Favourite"
                        : "Add this item to Favourite"}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="hover:bg-black hover:text-white">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-black"
                      onClick={favourite ? removeFavourite : addToFavourite}
                    >
                      {favourite ? "Remove from Favourite" : "Add to Favourite"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Delete item - AlertDialog Wrapper */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Trash2
                    className="hover:text-red-600 cursor-pointer block lg:hidden"
                    size={18}
                  />
                </AlertDialogTrigger>
                <AlertDialogTrigger asChild>
                  <Trash2 className="hover:text-red-600 cursor-pointer hidden lg:block" />
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will permanently delete this item from your
                      bag.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="hover:bg-black hover:text-white">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-black"
                      onClick={onDelete}
                    >
                      Yes, delete it
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagProductCard;
