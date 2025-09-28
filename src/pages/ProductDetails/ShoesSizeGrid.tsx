import products from "@/appwrite/APIs";
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

  const onSubmit = async (data: FormData) => {
    if (localStorage.getItem("isLogin") !== "true") {
      navigate("/login");
      return;
    }

    try {
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
    } catch (error: any) {
      toast.error(error.message);
      console.error("Booking failed", error);
    }
  };
  const selectSize = (size: number) =>
    setValue("size", size, { shouldValidate: true });

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

      <button
        type="submit"
        className="bg-black hover:bg-red-700 mt-8 text-white text-sm py-3.5 rounded-md font-medium transition-all active:scale-95 cursor-pointer w-full  outline-none"
      >
        Add to Bag
      </button>
    </form>
  );
};

export default ShoesSizeGrid;
