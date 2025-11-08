import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IProductCard } from "@/interfaces/IProduct";
import type { IUser } from "@/interfaces/IUser";
import type { IBagItem } from "@/interfaces/IBagItem";
import type { IFavourite } from "@/interfaces/IFavourites";

interface ProductState {
  productData: IProductCard[];
  featuredProductData: IProductCard[];
  userData: IUser | null;
  bagData: IBagItem[];
  favouriteData: IFavourite[];
  setProductData: (data: IProductCard[]) => void;
  setFeaturedProductData: (data: IProductCard[]) => void;
  setUserData: (data: IUser) => void;
  setBagData: (data: IBagItem[]) => void;
  setFavouriteData: (data: IFavourite[]) => void;
  clearProductData: () => void;
  clearFeaturedProductData: () => void;
  clearUserData: () => void;
  clearBagData: () => void;
  clearFavourite: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      productData: [],
      featuredProductData: [],
      userData: null,
      bagData: [],
      favouriteData: [],

      setProductData: (data) => set({ productData: data }),
      setFeaturedProductData: (data) => set({ featuredProductData: data }),
      setUserData: (data) => set({ userData: data }),
      setBagData: (data) => set({ bagData: [...data] }),
      setFavouriteData: (data) => set({ favouriteData: [...data] }),

      clearProductData: () => set({ productData: [] }),
      clearFeaturedProductData: () => set({ featuredProductData: [] }),
      clearUserData: () => set({ userData: null }),
      clearBagData: () => set({ bagData: [] }),
      clearFavourite: () => set({ favouriteData: [] }),
    }),
    {
      name: "user-data",
      // partialize: (state) => ({ userData: state.userData }),
    }
  )
);
