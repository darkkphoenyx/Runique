import type { IProductCard } from "@/interfaces/IProduct";
import { create } from "zustand";

// products
interface ProductState {
  productData: IProductCard[];
  featuredProductData: IProductCard[];
  setProductData: (data: IProductCard[]) => void;
  setFeaturedProductData: (data: IProductCard[]) => void;
  clearProductData: () => void;
  clearFeaturedProductData: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  productData: [],
  featuredProductData: [],

  setProductData: (data) => set({ productData: data }),
  setFeaturedProductData: (data) => set({ featuredProductData: data }),

  clearProductData: () => set({ productData: [] }),
  clearFeaturedProductData: () => set({ featuredProductData: [] }),
}));
