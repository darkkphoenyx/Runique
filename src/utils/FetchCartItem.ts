import products from "@/appwrite/APIs";

export const fetchCartData = async (userId: string) => {
  const res: any = await products.fetchBag(userId);
  const mapData = res.map((doc: any) => ({
    ...doc,
    id: doc.$id,
  }));
  return mapData;
};
