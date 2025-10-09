import products from "@/appwrite/APIs";
import { fetchCartData } from "@/utils/FetchCartItem";
import { useProductStore } from "@/zustand/store";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const BagProductCard = ({
  productId,
  size,
  quantity,
  userId,
  price,
}: {
  productId: string;
  size: number;
  quantity: number;
  userId: string;
  price: number;
}) => {
  const productData = useProductStore((state) => state.productData);
  const setBagData = useProductStore((state) => state.setBagData);
  const CardData = productData.find((item) => item.id === productId);

  // Handle increasing quantity
  const handleIncrease = async () => {
    if (quantity < 15) {
      try {
        await products.increaseQuantity(userId, productId, size, price);
        // update the bag data after increasing the quantity
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

  // Handle decreasing quantity
  const handleDecrease = async () => {
    if (quantity > 1) {
      try {
        await products.decreaseQuantity(userId, productId, size, price);
        // update the bag data after decreasing the quantity
        const updatedBagData = await fetchCartData(userId);
        setBagData(updatedBagData);
      } catch (error) {
        console.error("Failed to decrease quantity:", error);
      }
    }
  };

  return (
    <div>
      <div key={CardData?.id} className="flex md:gap-4 gap-2 border lg:p-2 p-1">
        <div className="w-fit overflow-hidden">
          <img
            className="md:h-[150px] md:w-[150px] h-[100px] w-[100px] object-cover"
            src={CardData?.imgUrl[0]}
            alt="Product image"
          />
        </div>
        <div className="flex-1 flex gap-2 justify-between flex-wrap ">
          <div>
            <h2 className="font-medium lg:text-lg">{CardData?.title}</h2>
            <p className="lg:text-sm text-xs font-medium">Size: {size}</p>
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
            <p className="font-medium lg:text-lg text-red-600 text-sm">
              MRP. {CardData?.price}
            </p>
            <div className="flex gap-3 lg:mt-4 text-gray-500">
              <Heart
                className="hover:text-red-600 cursor-pointer block lg:hidden"
                size={18}
              />
              <Heart className="hover:text-red-600 cursor-pointer hidden lg:block" />
              <Trash2
                className="hover:text-red-600 cursor-pointer block lg:hidden"
                size={18}
              />
              <Trash2 className="hover:text-red-600 cursor-pointer hidden lg:block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagProductCard;
