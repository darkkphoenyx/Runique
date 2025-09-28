export interface IProductCard {
  id: string;
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
