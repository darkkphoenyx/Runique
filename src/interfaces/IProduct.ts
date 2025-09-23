export interface IProductCard {
  title: string;
  header: string;
  description: string;
  price: number;
  colorAvailable: string[];
  gender?: string;
  kids?: string;
  sizes: number[];
  categories: string;
  imgUrl: string[];
  type: string;
  slug: string;
}
