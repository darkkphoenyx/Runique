import { X } from "lucide-react";
import { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

export function TagInputFiels({
  form,
  label,
  name,
  classname,
}: {
  form: any;
  name: string;
  label: string;
  classname?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const [inputValue, setInputValue] = useState("");

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if ((e.key === " " || e.key === "Enter") && inputValue.trim()) {
            e.preventDefault();
            const newColor = inputValue.trim();
            field.onChange([...(field.value || []), newColor]);
            setInputValue("");
          } else if (
            e.key === "Backspace" &&
            !inputValue &&
            field.value?.length
          ) {
            // Remove last color if input is empty
            field.onChange(field.value.slice(0, -1));
          }
        };

        const removeColor = (color: string) => {
          field.onChange(field.value.filter((c: string) => c !== color));
        };

        return (
          <FormItem>
            <FormLabel>Available {label}</FormLabel>
            <FormControl>
              <div
                className={cn(
                  `flex flex-wrap items-center gap-2 border rounded-md p-2 ${classname}`
                )}
              >
                {/* Render color tags */}
                {field.value?.map((color: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md text-sm"
                  >
                    <span>{color}</span>
                    <button
                      type="button"
                      onClick={() => removeColor(color)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {/* Input for adding new colors */}
                <input
                  type="text"
                  className="flex-1 min-w-[100px] outline-none"
                  placeholder={`Type a ${label
                    .slice(0, label.length - 1)
                    .toLowerCase()} & press space`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
