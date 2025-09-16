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
import { useParams } from "react-router-dom";

const sidebarData = [
  {
    id: 1,
    title: "Gender",
    field: "gender", // Must match Appwrite DB field
    content: ["Men", "Women", "Unisex"],
  },
  {
    id: 2,
    title: "Kids",
    field: "kids", // Must match Appwrite DB field
    content: ["Boy", "Girl"],
  },
  {
    id: 3,
    title: "Shop by Price",
    field: "price", // Must match Appwrite DB field
    content: ["Under Rs. 4999", "Rs. 5000 - Rs. 14999", "Above Rs.15000"],
  },
];

const CollectionSidebar = () => {
  const collectionId = useParams();
  console.log(collectionId);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const setProductData = useProductStore((state) => state.setProductData);

  // Handle filter select/deselect
  const handleFilterSelect = (field: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[field] || [];
      const alreadySelected = currentValues.includes(value);

      let updatedValues = alreadySelected
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      let updatedFilters = {
        ...prev,
        [field]: updatedValues,
      };

      if (updatedValues.length === 0) {
        delete updatedFilters[field];
      }

      //  Gender and Kids mutually exclusive
      const isGenderOrKids = field === "gender" || field === "kids";
      if (!alreadySelected && isGenderOrKids) {
        const otherField = field === "gender" ? "kids" : "gender";
        if (updatedFilters[otherField]) {
          delete updatedFilters[otherField];
        }
      }

      return updatedFilters;
    });
  };

  // Fetch products based on filters
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        console.log("Selected Filters:", selectedFilters);
        const res = await products.getProductDetails(selectedFilters);
        const data: any = res?.documents || [];
        setProductData(data);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    fetchFilteredProducts();
  }, [selectedFilters]);

  const isGenderSelected = !!selectedFilters["gender"]?.length;
  const isKidsSelected = !!selectedFilters["kids"]?.length;

  return (
    <div className="h-screen">
      <Accordion type="multiple" className="w-full">
        {sidebarData.map((data) => {
          const isDisabled =
            (data.field === "gender" && isKidsSelected) ||
            (data.field === "kids" && isGenderSelected);

          return (
            <AccordionItem key={data.id} value={String(data.id)}>
              <AccordionTrigger
                className={`text-lg hover:no-underline ${
                  isDisabled && "text-gray-400"
                }`}
              >
                {data.title}
              </AccordionTrigger>
              <AccordionContent
                className={`flex flex-col gap-1 ${
                  isDisabled && "text-gray-400"
                }`}
              >
                <fieldset disabled={isDisabled} className="w-full">
                  {data.content.map((item) => (
                    <div
                      key={item}
                      className={`flex gap-1.5 items-center ${
                        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                      onClick={() =>
                        !isDisabled && handleFilterSelect(data.field, item)
                      }
                    >
                      <Checkbox
                        checked={
                          selectedFilters[data.field]?.includes(item) || false
                        }
                        onCheckedChange={() => {}}
                        className="border-black data-[state=checked]:bg-black h-5 w-5 cursor-pointer"
                      />
                      <p
                        className={`text-black text-base hover:text-gray-700 ${
                          isDisabled ? "text-gray-400" : ""
                        }`}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </fieldset>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default CollectionSidebar;
