import type { IProductCard } from "@/interfaces/IProduct";
import { create } from "zustand";

// products
interface ProductState {
  productData: IProductCard[];
  setProductData: (data: IProductCard[]) => void;
  clearProductData: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  productData: [],
  setProductData: (data) => set({ productData: data }),
  clearProductData: () => set({ productData: [] }),
}));
