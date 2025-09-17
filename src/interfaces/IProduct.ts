export interface IProductCard {
  imgUrl: string;
  header: string;
  title: string;
  description: string;
  colorAvailable: string[];
  price: number;
  gender?: string;
  kids?: string;
  sizes: number[];
}
