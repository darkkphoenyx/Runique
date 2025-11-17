import type { IProductCard } from "@/interfaces/IProduct";

type ProductCardProps = {
  data: IProductCard;
};

const ProductCard: React.FC<ProductCardProps> = (data) => {
  return (
    <div className="p-2 rounded-lg hover:shadow-lg transition duration-200">
      {data.data.imgUrl && (
        <img
          src={data.data.imgUrl[0]}
          alt={data.data.title}
          className="w-full h-40 object-cover rounded-md mb-2"
        />
      )}
      <h3 className="font-semibold text-lg">{data.data.title}</h3>
      <p className="text-gray-600">${data.data.price}</p>
    </div>
  );
};

export default ProductCard;
