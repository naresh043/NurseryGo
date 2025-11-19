import "./productlist.css";
import { Filter, ProductCard, Loader } from "../../components";
import { useSelector } from "react-redux";

export default function ProductList() {
  const {
    products,
    searched,
    loading,
    price,
    rating,
    selectedCategories,
    seasonalFilter,
    sortBy,
  } = useSelector((state) => state.data);

  // Start with searched products if available
  let filteredProducts = searched.length ? searched : products;

  // Apply category filter
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      selectedCategories.includes(product.categoryName.toLowerCase())
    );
  }

  // Apply seasonal filter
  if (seasonalFilter && seasonalFilter !== "alltime") {
    filteredProducts = filteredProducts.filter(
      (product) => product.season.toLowerCase() === seasonalFilter
    );
  }

  // Apply price filter
  filteredProducts = filteredProducts.filter((product) => product.price <= price);

  // Apply rating filter
  if (rating > 0) {
    filteredProducts = filteredProducts.filter((product) => product.rating >= rating);
  }

  // Apply sort
  if (sortBy === "LOW_TO_HIGH") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "HIGH_TO_LOW") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "POPULARITY") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="grid-container-product">
      <div className="filter-grid">
        <Filter />
      </div>

      <div className="product-list">
        {loading ? (
          <Loader text="Loading..." />
        ) : filteredProducts.length === 0 ? (
          <p className="no-products">No products available</p>
        ) : (
          filteredProducts.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))
        )}
      </div>
    </div>
  );
}
