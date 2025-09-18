import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

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

type CollectionSidebarProps = {
  selectedFilters: Record<string, string[]>;
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
};

const CollectionSidebar = ({
  selectedFilters,
  setSelectedFilters,
}: CollectionSidebarProps) => {
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

  const isGenderSelected = !!selectedFilters["gender"]?.length;
  const isKidsSelected = !!selectedFilters["kids"]?.length;

  return (
    <div className="h-screen overflow-y-auto fixed lg:w-[185px] md:w-[350px] w-[265px]">
      <Accordion type="multiple" className="w-full">
        {sidebarData.map((data) => {
          const isDisabled =
            (data.field === "gender" && isKidsSelected) ||
            (data.field === "kids" && isGenderSelected);

          // Calculate number of selected filters for this section
          const selectedCount = selectedFilters[data.field]?.length || 0;

          return (
            <AccordionItem key={data.id} value={String(data.id)}>
              <AccordionTrigger
                className={`flex justify-between items-center text-lg hover:no-underline ${
                  isDisabled ? "text-gray-400" : ""
                }`}
              >
                <span className="flex items-center gap-1">
                  {data.title}{" "}
                  <span className="text-sm">
                    {selectedCount > 0 && `(${selectedCount})`}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent
                className={`flex flex-col gap-1 ${
                  isDisabled ? "text-gray-400" : ""
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
