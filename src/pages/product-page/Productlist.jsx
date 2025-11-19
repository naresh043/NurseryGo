import "./productlist.css";
import { Filter, ProductCard, Loader } from "../../components"; // cleaner import
import { useData } from "../../contexts";

export default function ProductList() {
  const { filtered: products, loading } = useData();

  return (
    <div className="grid-container-product">
      <div className="filter-grid">
        <Filter />
      </div>

      <div className="product-list">
        {loading ? (
          <Loader text="Loading..." />
        ) : products.length === 0 ? (
          <p className="no-products">No products available</p> // safe fallback
        ) : (
          products.map((item) => <ProductCard key={item._id} product={item} />)
        )}
      </div>
    </div>
  );
}
