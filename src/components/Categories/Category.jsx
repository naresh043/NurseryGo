import "./categories.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategoryFilter } from "../../redux/slices/dataSlice";

export default function Category() {
  const dispatch = useDispatch();

  return (
    <div className="hero-section">
      <h1 className="categories-heading">Available Categories</h1>

      {/* Indoor */}
      <Link
        to="/productlist"
        className="hero-container link-style-none"
        onClick={() => dispatch(setCategoryFilter(["indoor"]))}
      >
        <img
          src="https://nurserylive.com/cdn/shop/products/nurserylive-g-plants-peace-lily-spathiphyllum-plant-887951_306x306.jpg?v=1751715640"
          className="hero-image"
          alt="Indoor Plant"
        />
        <span className="text-md text-bold">Indoor</span>
      </Link>

      {/* Flowering */}
      <Link
        to="/productlist"
        className="hero-container link-style-none"
        onClick={() => dispatch(setCategoryFilter(["flowering"]))}
      >
        <img
          src="https://nurserylive.com/cdn/shop/files/miniature-rose-pink_af4e62e8-27e9-4f8c-98d6-9ce07342ce9d_305x305.jpg?v=1752562400"
          className="hero-image"
          alt="Flowering"
        />
        <span className="text-md text-bold">Flower</span>
      </Link>

      {/* Outdoor */}
      <Link
        to="/productlist"
        className="hero-container link-style-none"
        onClick={() => dispatch(setCategoryFilter(["outdoor"]))}
      >
        <img
          src="https://nurserylive.com/cdn/shop/products/nurserylive-combo-packs-plants-popular-outdoor-plants-for-gardening-on-terrace-16969219211404_305x305.jpg?v=1634226628"
          className="hero-image"
          alt="Outdoor"
        />
        <span className="text-md text-bold">Outdoor</span>
      </Link>

      {/* Fruits */}
      <Link
        to="/productlist"
        className="hero-container link-style-none"
        onClick={() => dispatch(setCategoryFilter(["fruit"]))}
      >
        <img
          src="https://i.postimg.cc/DwTVJkHx/fruits.png"
          className="hero-image"
          alt="Fruits"
        />
        <span className="text-md text-bold">Fruit</span>
      </Link>

      {/* Succulent */}
      <Link
        to="/productlist"
        className="hero-container link-style-none"
        onClick={() => dispatch(setCategoryFilter(["succulent"]))}
      >
        <img
          src="https://nurserylive.com/cdn/shop/products/succulents-mix-4-600x600-466057_306x279.jpg?v=1685021422"
          className="hero-image"
          alt="Succulent"
        />
        <span className="text-md text-bold">Succulent</span>
      </Link>

      {/* Medicinal */}
      <Link
        to="/productlist"
        className="hero-container link-style-none"
        onClick={() => dispatch(setCategoryFilter(["medicinal"]))}
      >
        <img
          src="https://nurserylive.com/cdn/shop/products/nurserylive-plants-krishna-tulsi-plant-holy-basil-ocimum-tenuiflorum-black-plant-16968990425228_305x305.jpg?v=1634226020"
          className="hero-image"
          alt="Medicinal"
        />
        <span className="text-md text-bold">Medicinal</span>
      </Link>
    </div>
  );
}
