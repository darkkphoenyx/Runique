import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IProductCard } from "@/interfaces/IProduct";
import type { IUser } from "@/interfaces/IUser";
import type { IBagItem } from "@/interfaces/IBagItem";

interface ProductState {
  productData: IProductCard[];
  featuredProductData: IProductCard[];
  userData: IUser | null;
  bagData: IBagItem[];
  setProductData: (data: IProductCard[]) => void;
  setFeaturedProductData: (data: IProductCard[]) => void;
  setUserData: (data: IUser) => void;
  setBagData: (data: IBagItem[]) => void;
  clearProductData: () => void;
  clearFeaturedProductData: () => void;
  clearUserData: () => void;
  clearBagData: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      productData: [],
      featuredProductData: [],
      userData: null,
      bagData: [],

      setProductData: (data) => set({ productData: data }),
      setFeaturedProductData: (data) => set({ featuredProductData: data }),
      setUserData: (data) => set({ userData: data }),
      setBagData: (data) => set({ bagData: [...data] }),

      clearProductData: () => set({ productData: [] }),
      clearFeaturedProductData: () => set({ featuredProductData: [] }),
      clearUserData: () => set({ userData: null }),
      clearBagData: () => set({ bagData: [] }),
    }),
    {
      name: "user-data",
      // partialize: (state) => ({ userData: state.userData }),
    }
  )
);
