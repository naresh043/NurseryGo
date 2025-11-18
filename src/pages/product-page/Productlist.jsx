import "./productlist.css";
import { Filter, ProductCard } from "../../components";
import { useData } from "../../contexts";
import { Loader } from "../../components";

export default function ProductList() {
  const { filtered, loading, loadText } = useData();

  return (
    <div className="grid-container-product">
      <div className="filter-grid">
        <Filter />
      </div>
      <div className="product-list">
        {loading ? (
          <Loader text={loadText} />
        ) : (
          <>
            {filtered?.map((item) => {
              return <ProductCard key={item._id} product={item} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}
