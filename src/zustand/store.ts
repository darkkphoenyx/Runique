import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IProductCard } from "@/interfaces/IProduct";
import type { IUser } from "@/interfaces/IUser";

interface ProductState {
  productData: IProductCard[];
  featuredProductData: IProductCard[];
  userData: IUser | null;
  setProductData: (data: IProductCard[]) => void;
  setFeaturedProductData: (data: IProductCard[]) => void;
  setUserData: (data: IUser) => void;
  clearProductData: () => void;
  clearFeaturedProductData: () => void;
  clearUserData: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      productData: [],
      featuredProductData: [],
      userData: null,

      setProductData: (data) => set({ productData: data }),
      setFeaturedProductData: (data) => set({ featuredProductData: data }),
      setUserData: (data) => set({ userData: data }),

      clearProductData: () => set({ productData: [] }),
      clearFeaturedProductData: () => set({ featuredProductData: [] }),
      clearUserData: () => set({ userData: null }),
    }),
    {
      name: "user-data",
      // partialize: (state) => ({ userData: state.userData }),
    }
  )
);
