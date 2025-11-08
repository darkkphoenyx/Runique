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
  price: z.string().min(1, "Price must be greater than 0"),
  colorAvailable: z.array(z.string()).min(1, "At least one color is required"),
  gender: z.string().optional(),
  kids: z.string().optional(),
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

  const handleSubmit = (data: FormSchemaType) => {
    console.log(data);
  };

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
      //delete the image from the image array
      setImages((prev) => prev.filter((temp) => temp.id !== id));

      //delete it from the form also
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

  console.log("data is:", images);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-3 gap-6">
          <div className="border p-4 flex items-center col-span-1 rounded-md">
            <ImageUploader setImages={setImages} form={form} />
          </div>

          <div className="col-span-2">
            <div className=" grid grid-cols-2 gap-6 w-full">
              {/* section 2A */}
              <div className="flex flex-col gap-6">
                {/* name */}
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

                {/* gender */}
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
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem defaultChecked value="unisex">
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

                {/* type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <input
                          className="outline-none border p-2 rounded-md"
                          placeholder="Mens's shoes"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* available colors */}
                <TagInputFiels
                  form={form}
                  label="Colors"
                  name="colorAvailable"
                />

                {/* description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea
                          className="rounded-md outline-none border p-2 h-[120px] resize-none"
                          placeholder="This is the second installement in the Blade X series from Goldstar."
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
                {/* price */}
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

                {/* kids */}
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
                              <SelectItem value="boy">Boy</SelectItem>
                              <SelectItem value="girl">Girl</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* slug */}
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <input
                          disabled
                          className="outline-none border p-2 rounded-md  text-gray-500"
                          placeholder="will be auto generated"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <input
                          className="outline-none border p-2 rounded-md"
                          placeholder="Rs. XXXX"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* available sizes */}
                <TagInputFiels
                  form={form}
                  label="Sizes"
                  name="sizes"
                  classname="h-[120px]"
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

        <button type="submit">Submit</button>
      </form>
    </Form>
  );
};

export default AddProduct;
