import products from "@/appwrite/APIs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IProductCard } from "@/interfaces/IProduct";
import { cn } from "@/lib/utils";
import { fetchProductDetail } from "@/utils/FetchProductDetails";
import { useProductStore } from "@/zustand/store";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CollectionCard = ({
  data,
  isAdmin,
}: {
  data: IProductCard;
  isAdmin?: boolean;
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const setProductData = useProductStore((state) => state.setProductData);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const handleProductNavigation = (slug: string) => {
    if (!isAdmin) navigate(`/p/${encodeURIComponent(slug)}`);
    else {
      navigate("/admin/add-products", { state: data });
    }
  };

  //this part is only for admin
  const handleDelete = async (id: string) => {
    try {
      await products.deleteProduct(id);
      //refetch data to update the store
      const res = await fetchProductDetail(selectedFilters);
      setProductData(res);
      toast.success("Product deleted");
      setSelectedFilters({});
    } catch (error) {
      toast.error("Error deleting product");
      console.error(error);
    }
  };
  return (
    <Card
      onClick={() => !isAdmin && handleProductNavigation(data.slug)}
      className={cn(
        ` p-0 rounded-none gap-0 border-none shadow-none  ${
          !isAdmin && "active:scale-[98%] cursor-pointer"
        } transition-all duration-300`
      )}
    >
      <div className="md:h-[500px] h-[200px] relative">
        <img
          className="w-full h-full object-cover border"
          src={
            data.imgUrl[0] ||
            "https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small/no-image-available-icon-vector.jpg"
          }
          alt="card image"
        />
        {isAdmin && (
          <div className="flex gap-2 absolute top-2 right-2">
            <button
              onClick={() => handleProductNavigation(data.slug)}
              className=" transition-all active:scale-[98%] cursor-pointer
             bg-red-600 text-white text-sm md:px-4 px-2 md:py-2 py-1 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => setOpen(true)}
              className=" transition-all active:scale-[98%] cursor-pointer
             bg-red-600 text-white text-sm  px-2  py-1 rounded-md"
            >
              <Trash2 />
            </button>
          </div>
        )}
      </div>
      {/* alert box */}
      <AlertDialog open={open} onOpenChange={() => setOpen(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-gray-500 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(data.id)}
              className="bg-red-600 hover:bg-black"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
      <p className="font-semibold mt-auto text-red-600">Rs. {data.price}</p>
    </Card>
  );
};

export default CollectionCard;
