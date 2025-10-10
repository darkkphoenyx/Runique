// Bag.tsx
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProductStore } from "@/zustand/store";
import { CircleQuestionMark } from "lucide-react";
import BagProductCard from "./BagProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import Footer from "@/components/footer/Footer";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import products from "@/appwrite/APIs";
import { fetchCartData } from "@/utils/FetchCartItem";
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

const Bag = () => {
  const bagData = useProductStore((state) => state.bagData);
  const setBagData = useProductStore((state) => state.setBagData);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);

  useEffect(() => {
    const totalQuantity = bagData
      .filter((item) => selectedItems.includes(item.id))
      .reduce((acc, item) => acc + item.quantity, 0);
    setSelectedQuantity(totalQuantity);
  }, [selectedItems, bagData]);

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    bagData.length > 0 && selectedItems.length === bagData.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      const allIds = bagData.map((item) => item.id);
      setSelectedItems(allIds);
    }
  };

  const handleDeleteItem = async (id: string, userId: string) => {
    try {
      await products.deleteOrderItems(id);
      setTimeout(async () => {
        const updated = await fetchCartData(userId);
        setBagData(updated);
        toast.success("Item deleted");
      }, 300); //this is done prevent the server down time - delay
    } catch (error) {
      toast.error("Failed to delete item");
      console.error(error);
    }
  };

  // console.log(bagData);
  const deleteSelectedItems = async () => {
    try {
      await Promise.all(
        selectedItems.map((id) => {
          const item = bagData.find((item) => item.id === id);
          return item ? products.deleteOrderItems(item.id) : null;
        })
      );
      const updated = await fetchCartData(bagData[0]?.users || "");
      setBagData(updated);
      setSelectedItems([]);
      toast.success("Selected items deleted");
    } catch (error) {
      toast.error("Failed to delete selected items");
      console.error(error);
    }
  };

  const subtotal = bagData
    .filter((item) => selectedItems.includes(item.id))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="h-full flex flex-col lg:pt-28 pt-20 px-4">
      <div className="lg:grid lg:grid-cols-3 lg:max-w-[1200px] h-full w-full mx-auto lg:gap-8">
        {/* LEFT SIDE - BAG ITEMS */}
        <div className="flex gap-4 flex-col col-span-2 max-lg:overflow-y-scroll max-lg:max-h-[370px]">
          <div className="max-lg:sticky top-0 bg-white flex border p-2 gap-2 items-center text-black/50 uppercase text-sm">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={toggleSelectAll}
              className="border-black/50 data-[state=checked]:bg-black h-5 w-5 cursor-pointer"
            />
            Select all ({bagData.length} item{bagData.length !== 1 ? "s" : ""})
            {selectedItems.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="ml-auto text-red-600 text-xs underline">
                    Delete Selected
                  </button>
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
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600"
                      onClick={deleteSelectedItems}
                    >
                      Yes, delete it
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          <div className="gap-2 flex flex-col">
            {bagData.map((item) => (
              <BagProductCard
                id={item.id}
                key={item.id}
                price={item.price}
                userId={item.users}
                quantity={Number(item.quantity)}
                size={Number(item.size)}
                productId={item.products}
                isSelected={selectedItems.includes(item.id)}
                onSelect={() => toggleSelect(item.id)}
                onDelete={() => handleDeleteItem(item.id, item.users)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="col-span-1 lg:mt-0 h-fit w-full hidden lg:block lg:sticky top-28 bg-white px-2">
          <h3 className="font-medium text-xl">Summary</h3>

          <Tooltip>
            <div className="flex items-center justify-between lg:pt-6 pt-4">
              <div className="flex items-center gap-1">
                <p className="font-medium text-sm">Subtotal</p>
                <TooltipTrigger asChild>
                  <CircleQuestionMark
                    size={16}
                    className="text-white"
                    fill="black"
                  />
                </TooltipTrigger>
                <p className="text-xs">({selectedQuantity} item)</p>
              </div>
              <p className="text-[15px] font-semibold">
                Rs. {subtotal.toLocaleString()}
              </p>
            </div>
            <TooltipContent className="bg-[#585858] text-white">
              <p className="w-[150px]">
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

            <div className="flex justify-between">
              <p className="text-[15px] font-semibold">Total</p>
              <p className="text-base font-semibold text-red-600">
                Rs. {subtotal.toLocaleString()}
              </p>
            </div>

            <Separator />

            <SecondaryButton
              disabled={selectedItems.length <= 0}
              title="Proceed to Checkout"
              className="border rounded-full py-6"
            />
          </div>
        </div>
      </div>

      {/* FOOTER MOBILE */}
      <div className="w-full lg:hidden fixed bottom-0 bg-white pr-8 py-4">
        <Separator />
        <h3 className="font-medium text-xl pt-4">Summary</h3>
        <Tooltip>
          <div className="flex items-center justify-between lg:pt-6 pt-4">
            <div className="flex items-center gap-1">
              <p className="font-medium text-sm">Subtotal</p>
              <TooltipTrigger asChild>
                <CircleQuestionMark
                  size={16}
                  className="text-white"
                  fill="black"
                />
              </TooltipTrigger>
              <p className="text-xs">({selectedQuantity} item)</p>
            </div>
            <p className="text-[15px] font-semibold">
              Rs. {subtotal.toLocaleString()}
            </p>
          </div>
          <TooltipContent className="bg-[#585858] text-white">
            <p className="w-[150px]">
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

          <div className="flex justify-between">
            <p className="text-[15px] font-semibold">Total</p>
            <p className="text-base font-semibold text-red-600">
              Rs. {subtotal.toLocaleString()}
            </p>
          </div>

          <Separator />

          <SecondaryButton
            disabled={selectedItems.length <= 0}
            title="Proceed to Checkout"
            className="border rounded-full py-6"
          />
        </div>
      </div>

      <div className="hidden lg:block mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default Bag;
