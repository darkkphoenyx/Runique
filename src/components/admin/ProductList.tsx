import type { IProductCard } from "@/interfaces/IProduct";
import ProductCard from "./ProductCard";

type ProductListProps = {
  products: IProductCard[];
  title?: string;
};

const ProductList: React.FC<ProductListProps> = ({ products, title }) => {
  return (
    <div className="">
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      <div className="grid grid-cols-2 gap-6">
        {products.map((p) => (
          <ProductCard data={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
