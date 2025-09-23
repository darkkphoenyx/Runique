import { useState } from "react";

const ShoesSizeGrid = ({ sizeData }: { sizeData: number[] }) => {
  const [isSelected, setIsSelected] = useState<number | null>(null);

  const handleSizeSelect = (size: number) => {
    if (size === isSelected) setIsSelected(null);
    else setIsSelected(size);
  };

  return (
    <div className="mt-10 space-y-3">
      <h2 className="font-medium">Select Size</h2>
      <div className="grid grid-cols-2 gap-2">
        {sizeData.map((size) => (
          <button
            onClick={() => handleSizeSelect(size)}
            key={size}
            className={`font-medium cursor-pointer w-full border rounded-md py-2 hover:border-black active:scale-95 transition-all ${
              isSelected === size
                ? "bg-red-600 text-white border-none"
                : " border-gray-300"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShoesSizeGrid;
