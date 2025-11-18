import { Filter, SingleProduct } from "../../components";
import { useData } from "../../contexts";
import { useParams } from "react-router-dom";

export default function SingleProductPage() {
  const { productId } = useParams();
  const { filtered } = useData();
  return (
    <div className="grid-container-product">
      <div className="filter-grid">
        <Filter />
      </div>
      <div className="product-list">
        {filtered.map((item) =>
          item._id === productId ? <SingleProduct product={item} /> : null
        )}
      </div>
    </div>
  );
}
