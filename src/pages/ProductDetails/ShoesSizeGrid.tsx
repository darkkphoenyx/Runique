import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormData = {
  size: number | null;
};

const ShoesSizeGrid = ({ sizeData }: { sizeData: number[] }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { size: null },
  });

  const selectedSize = watch("size");

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    if (localStorage.getItem("isLogin") !== "true") {
      navigate("/login");
      return;
    }
    console.log(data);
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

      <input
        type="hidden"
        {...register("size", { required: true })}
        value={selectedSize ?? ""}
      />

      <button
        type="submit"
        className="bg-black hover:bg-red-700 mt-8 text-white text-sm py-3.5 rounded-md font-medium transition-all active:scale-95 cursor-pointer w-full "
      >
        Submit
      </button>
    </form>
  );
};

export default ShoesSizeGrid;
