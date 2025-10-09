import Footer from "@/components/footer/Footer";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProductStore } from "@/zustand/store";
import { CircleQuestionMark } from "lucide-react";
import BagProductCard from "./BagProductCard";

const Bag = () => {
  const bagData = useProductStore((state) => state.bagData);

  return (
    <div className="h-screen flex flex-col lg:pt-28 pt-20 px-4">
      <div className="lg:grid lg:grid-cols-3 lg:max-w-[1000px] w-full mx-auto gap-8">
        {/* product list */}
        <div className="flex gap-4 flex-col col-span-2">
          {bagData.map((item) => (
            <BagProductCard
              key={item.id}
              price={item.price}
              userId={item.users}
              quantity={Number(item.quantity)}
              size={Number(item.size)}
              productId={item.products}
            />
          ))}
        </div>

        {/* summary tab */}
        <div className="col-span-1 lg:mt-0 mt-8 h-fit sticky top-28">
          <h3 className="font-medium text-xl">Summary</h3>

          {/* totol is shown here */}
          <Tooltip>
            <div className="flex items-center gap-1 lg:pt-6 pt-4">
              <p className="font-medium text-sm">Subtotal</p>
              <TooltipTrigger asChild className="wfit">
                <CircleQuestionMark
                  size={16}
                  className=" text-white"
                  fill="black"
                />
              </TooltipTrigger>
            </div>
            <TooltipContent className="bg-[#585858] text-white">
              <p className="w-[150px] bg-[#585858] ">
                The total reflects the price of your order, including all duties
                and taxes.
              </p>
            </TooltipContent>
          </Tooltip>

          <div className="font-medium text-sm mt-2 flex flex-col gap-4">
            <div className="flex justify-between">
              <p>Estimated Delivery & Handling</p>
              <p>Free</p>
            </div>

            <Separator />

            <div>
              <p className="text-[15px] font-semibold">Total</p>
            </div>

            <Separator />
          </div>
        </div>
      </div>
      <div className="mt-auto lg:pt-16 pt-8">
        <Footer />
      </div>
    </div>
  );
};

export default Bag;
