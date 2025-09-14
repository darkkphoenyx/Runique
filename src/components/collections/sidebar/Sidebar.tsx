import products from "@/appwrite/APIs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useProductStore } from "@/zustand/store";
import { useEffect, useState } from "react";

const sidebarData = [
  {
    id: 1,
    title: "Gender",
    content: ["Men", "Women", "Unisex"],
  },
  {
    id: 2,
    title: "Kids",
    content: ["Boy", "Girl"],
  },
  {
    id: 3,
    title: "Shop by Price",
    content: ["Under Rs. 2500", "Rs. 2500 - Rs. 5000", "Above Rs.5000"],
  },
];

const CollectionSidebar = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const setProductData = useProductStore((state) => state.setProductData);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const res = await products.getProductDetails(selectedFilter);
        const data: any = res?.documents || [];
        setProductData(data);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    if (selectedFilter) fetchFilteredProducts();
  }, [selectedFilter]);

  const handleFilterSelect = (value: string) => {
    setSelectedFilter((prev) => (prev === value ? "" : value)); // toggle
  };

  return (
    <div className="h-screen fixed w-[180px]">
      <Accordion type="single" collapsible className="w-full">
        {sidebarData.map((data) => (
          <AccordionItem key={data.id} value={String(data.id)}>
            <AccordionTrigger className="text-lg hover:no-underline">
              {data.title}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              {data.content.map((item) => (
                <div
                  key={item}
                  className="flex gap-1.5 items-center cursor-pointer"
                >
                  <Checkbox
                    checked={selectedFilter === item}
                    onCheckedChange={() => handleFilterSelect(item)}
                    className="border-black data-[state=checked]:bg-black h-5 w-5"
                  />
                  <p className="text-black text-base hover:text-gray-700">
                    {item}
                  </p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CollectionSidebar;
