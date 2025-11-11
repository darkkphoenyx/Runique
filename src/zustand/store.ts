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
  searchQuery: string;

  setProductData: (data: IProductCard[]) => void;
  setFeaturedProductData: (data: IProductCard[]) => void;
  setUserData: (data: IUser) => void;
  setBagData: (data: IBagItem[]) => void;
  setFavouriteData: (data: IFavourite[]) => void;
  setSearchQuery: (query: string) => void;

  clearProductData: () => void;
  clearFeaturedProductData: () => void;
  clearUserData: () => void;
  clearBagData: () => void;
  clearFavourite: () => void;

  filteredProducts: () => IProductCard[];
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      productData: [],
      featuredProductData: [],
      userData: null,
      bagData: [],
      favouriteData: [],
      searchQuery: "",

      setProductData: (data) => set({ productData: data }),
      setFeaturedProductData: (data) => set({ featuredProductData: data }),
      setUserData: (data) => set({ userData: data }),
      setBagData: (data) => set({ bagData: [...data] }),
      setFavouriteData: (data) => set({ favouriteData: [...data] }),
      setSearchQuery: (query) => set({ searchQuery: query }),

      clearProductData: () => set({ productData: [] }),
      clearFeaturedProductData: () => set({ featuredProductData: [] }),
      clearUserData: () => set({ userData: null }),
      clearBagData: () => set({ bagData: [] }),
      clearFavourite: () => set({ favouriteData: [] }),

      filteredProducts: () => {
        const { productData, searchQuery } = get();
        if (!searchQuery.trim()) return productData;
        return productData.filter((p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      },
    }),
    {
      name: "user-data",
    }
  )
);
