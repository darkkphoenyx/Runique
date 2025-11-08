import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TagInputFiels } from "./TagInput";
import { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import { Trash2 } from "lucide-react";
import products from "@/appwrite/APIs";
import { toast } from "sonner";

export const formSchema = z.object({
  title: z.string().min(1, "Name is required"),
  header: z.string().min(1, "Header is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  colorAvailable: z.array(z.string()).min(1, "At least one color is required"),
  gender: z.string().min(1, "Select a gender"),
  kids: z.string().min(1, "Select a Kids category"),
  sizes: z.array(z.string()).min(1, "Please add at least one size"),
  categories: z.string().optional(),
  imgUrl: z.array(z.string()).optional(),
  type: z.string().min(1, "Type is required"),
  slug: z.string().min(1, "Slug is required"),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export interface Iimage {
  link: string;
  id: string;
}

const sizes = [
  "22",
  "24",
  "26",
  "28",
  "30",
  "32",
  "34",
  "36",
  "38",
  "40",
  "42",
];

const AddProduct = () => {
  const [images, setImages] = useState<Iimage[]>([]);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      header: "",
      description: "",
      price: "",
      colorAvailable: [],
      gender: "",
      kids: "",
      sizes: [],
      categories: "",
      imgUrl: [],
      type: "",
      slug: "",
    },
  });

  // Generate slug based on title
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "title") {
        const title = value.title || "";

        // Resetting to null if title is deleted
        if (title.trim() === "") {
          form.setValue("slug", "");
          return;
        }

        const newSlug = title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");

        form.setValue("slug", newSlug);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const handleRemoveImage = async (id: string) => {
    try {
      await products.deletePhoto(id);
      // Delete the image from the image array
      setImages((prev) => prev.filter((temp) => temp.id !== id));

      // Delete it from the form also
      const updatedImgUrls = (form.getValues("imgUrl") ?? []).filter(
        (url: string) => {
          return !images.some((img) => img.id === id && img.link === url);
        }
      );

      form.setValue("imgUrl", updatedImgUrls);

      toast.success("Photo deleted");
    } catch (error: any) {
      toast.error(error);
      console.error(error);
    }
  };

  const handleSubmit = async (data: FormSchemaType) => {
    const priceAsNumber = parseFloat(data.price);

    if (isNaN(priceAsNumber)) {
      toast.error("Invalid price entered");
      return;
    }

    console.log("Price as number: ", priceAsNumber);
    console.log("Price as number: ", typeof priceAsNumber);

    // Changing price from string to number
    const processedData = {
      ...data,
      price: priceAsNumber,
    };

    try {
      await products.addProduct(processedData);
      toast.success("Product added!");
    } catch (error) {
      console.error(error);
    }
    console.log("Form Data:", processedData);
  };

  useEffect(() => {
    const errors = form.formState.errors;
    if (Object.keys(errors).length > 0) {
      console.log("Form Errors:", errors);
    }
  }, [form.formState.errors]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col h-full gap-4"
      >
        <div className="grid lg:grid-cols-3 lg:gap-6 max-lg:gap-y-6 grid-cols-1 w-full mx-auto">
          <div className="border p-4 flex items-center mx-auto lg:col-span-1 rounded-md w-full">
            <ImageUploader setImages={setImages} form={form} />
          </div>

          <div className="col-span-2">
            <div className="grid md:grid-cols-2 gap-6 w-full">
              {/* section 2A */}
              <div className="flex flex-col gap-6">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <input
                          className="outline-none border p-2 rounded-md"
                          placeholder="Goldstar Blade II"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full focus-visible:ring-0">
                            <SelectValue placeholder="Select a gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Men">Men</SelectItem>
                              <SelectItem value="Women">Women</SelectItem>
                              <SelectItem defaultChecked value="Unisex">
                                Unisex
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <input
                          className="outline-none border p-2 rounded-md"
                          placeholder="Men's shoes"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Available Colors */}
                <TagInputFiels
                  form={form}
                  label="Colors"
                  name="colorAvailable"
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea
                          className="rounded-md outline-none border p-2 lg:h-[113px] md:h-[220px] h-[120px] resize-none"
                          placeholder="This is the second installment in the Blade X series from Goldstar."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* section 2B */}
              <div className="flex flex-col gap-6">
                {/* Header */}
                <FormField
                  control={form.control}
                  name="header"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Header</FormLabel>
                      <FormControl>
                        <input
                          className="outline-none border p-2 rounded-md"
                          placeholder="Limited Edition"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Kids */}
                <FormField
                  control={form.control}
                  name="kids"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kids</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full focus-visible:ring-0">
                            <SelectValue placeholder="Select a gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Boy">Boy</SelectItem>
                              <SelectItem value="Girl">Girl</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Slug */}
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <input
                          disabled
                          className="outline-none border p-2 rounded-md text-gray-500"
                          placeholder="Will be auto-generated"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <input
                          type="number"
                          className="outline-none border p-2 rounded-md"
                          placeholder="Rs. XXXX"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Available Sizes */}
                <FormField
                  control={form.control}
                  name="sizes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available Sizes</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-3 border p-2 rounded-md">
                          {sizes.map((size) => {
                            const selected = field.value.includes(size); // Check if the size is selected
                            return (
                              <button
                                key={size}
                                type="button"
                                onClick={() => {
                                  const newSelected = selected
                                    ? field.value.filter(
                                        (s: string) => s !== size
                                      )
                                    : [...field.value, size];

                                  field.onChange(newSelected);
                                }}
                                className={`${
                                  selected
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-700"
                                } border border-gray-300 rounded-md py-2 px-4 transition-colors hover:bg-blue-500 focus:outline-none`}
                              >
                                {size}
                              </button>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Image display section */}
            <div className="mt-6 overflow-hidden min-h-[150px] flex gap-3 border p-2 rounded-md flex-wrap">
              {images.length > 0 ? (
                <>
                  {images.map((item, idx) => (
                    <div key={idx} className="relative">
                      <>
                        <img
                          src={item.link}
                          alt={`Uploaded Image ${idx}`}
                          className="h-30 w-auto object-cover shadow-md"
                        />
                        <div
                          onClick={() => handleRemoveImage(item.id)}
                          className="absolute top-0 right-0 m-2 cursor-pointer rounded-full bg-white p-2"
                        >
                          <Trash2 className="text-red-500" size={16} />
                        </div>
                      </>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-gray-400 flex items-center justify-center w-full">
                  Uploaded images are shown here.
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-auto bg-red-600 text-white py-2 rounded-md font-medium text-lg"
        >
          Submit
        </button>
      </form>
    </Form>
  );
};

export default AddProduct;
