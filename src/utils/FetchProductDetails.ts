import products from "@/appwrite/APIs";

export const fetchProductDetail = async (
  selectedFilters: Record<string, string[]>
) => {
  const res = await products.getProductDetails(selectedFilters);
  const rawData: any[] = res?.documents || [];

  const mappedData = rawData.map((doc) => ({
    ...doc,
    id: doc.$id,
  }));

  return mappedData;
};
