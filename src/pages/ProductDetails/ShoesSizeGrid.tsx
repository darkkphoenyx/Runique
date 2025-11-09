import products from "@/appwrite/APIs";
import { fetchCartData } from "@/utils/FetchCartItem";
import { useProductStore } from "@/zustand/store";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type FormData = {
  size: number;
  quantity: number;
};

const ShoesSizeGrid = ({
  productId,
  sizeData,
  price,
}: {
  productId: string;
  price: number;
  sizeData: number[];
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      size: undefined,
      quantity: 1,
    },
  });

  const userData = useProductStore((state) => state.userData);
  const selectedSize = watch("size");
  const navigate = useNavigate();
  const setBagData = useProductStore((state) => state.setBagData);
  const setFavouriteData = useProductStore((state) => state.setFavouriteData);
  const userId = userData?.id || "";
  const isAdminLoggedIn = JSON.parse(
    localStorage.getItem("isAdmin") || "false"
  );

  const onSubmit = async (data: FormData) => {
    if (localStorage.getItem("isLogin") !== "true") {
      navigate("/login");
      return;
    }

    try {
      if (isAdminLoggedIn) throw new Error("Unauthorized for Admin.");

      if (!userData?.id) {
        toast.error("User ID not found. Please log in again.");
        navigate("/login");
        return;
      }
      await products.orderItems(
        userData.id,
        productId,
        Number(data.quantity),
        Number(data.size),
        price
      );
      toast.success("Added to bag!");
      // updating the cart items
      const cartData = await fetchCartData(userId);
      setBagData(cartData);
    } catch (error: any) {
      toast.error(error.message);
      console.error("Booking failed", error);
    }
  };
  const selectSize = (size: number) =>
    setValue("size", size, { shouldValidate: true });

  const addToFavourite = async (userId: string, productId: string) => {
    try {
      if (isAdminLoggedIn) throw new Error("Unauthorized for Admin.");
      const res = await products.addToFavourite(userId, productId);

      if (res === 409) toast.error("Already added");
      else if (res === 201) {
        const favouriteData: any = await products.getFavourites();
        setFavouriteData(favouriteData.documents);
        toast.success("Added to Favourite");
      } else throw new Error("Failed to Add");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-3">
      <h2 className="font-medium">Select Size</h2>
      <div className="grid grid-cols-2 gap-2">
        {sizeData.map((size) => (
          <button
            type="button"
            key={size}
            onClick={() => selectSize(size)}
            className={`font-medium cursor-pointer w-full border rounded-md py-2 hover:border-black active:scale-95 transition-all ${
              selectedSize === size
                ? "bg-red-600 text-white border-none"
                : "border-gray-300"
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      {errors.size && (
        <p className="text-red-600 mt-1 text-sm">Please select a size</p>
      )}

      <h2 className="font-medium mt-6">Quantity</h2>
      <input
        className="border outline-none border-gray-300 rounded-md p-2 w-full"
        type="number"
        min={1}
        {...register("quantity", {
          required: "Please enter quantity",
          min: {
            value: 1,
            message: "Quantity must be at least 1",
          },
        })}
        placeholder="Quantity"
      />
      {errors.quantity && (
        <p className="text-red-600 mt-1 text-sm">{errors.quantity.message}</p>
      )}

      {/* add to cart button */}
      <button
        type="submit"
        className="bg-black  mt-8 text-white text-sm py-3.5 rounded-md font-medium transition-all active:scale-98 cursor-pointer w-full  outline-none"
      >
        Add to Bag
      </button>

      {/* add to favourite button */}
      <button
        onClick={() => addToFavourite(userId, productId)}
        type="button"
        className="bg-white hover:bg-red-600 hover:text-white  text-black border border-black hover:border-red-600 text-sm py-3.5 rounded-md font-medium transition-all active:scale-98 cursor-pointer w-full outline-none"
      >
        Add to Favourite
      </button>
    </form>
  );
};

export default ShoesSizeGrid;
