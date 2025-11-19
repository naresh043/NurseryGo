import "./filter.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setPrice,
  setRating,
  setSortBy,
  setCategoryFilter,
  setSeasonalFilter,
  clearFilters,
} from "../../redux/slices/dataSlice";

export default function Filter() {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  return (
    <div className="filter-section">
      {/* HEADINGS */}
      <section className="filter-headings">
        <p className="text-lg text-bold">Filters</p>
        <button
          className="btn btn-solid-primary clear-filter"
          onClick={() => dispatch(clearFilters())}
        >
          Clear
        </button>
      </section>

      {/* PRICE */}
      <p className="text-md text-bold">Price</p>
      <div className="range-slider">
        <input
          type="range"
          min="199"
          max="1500"
          step="20"
          value={data.price}
          onChange={(e) => dispatch(setPrice(e.target.value))}
        />
        <span className="range-value text-md text-bold">{data.price}</span>
      </div>

      {/* CATEGORIES */}
      <p className="text-md text-bold">Categories</p>
      {data?.categories.map((item) => {
        const category = item.categoryName.toLowerCase();
        return (
          <label className="text-md" key={item._id}>
            <input
              type="checkbox"
              checked={data.selectedCategories.includes(category)}
              onChange={() => dispatch(setCategoryFilter(category))}
            />
            {item.categoryName}
          </label>
        );
      })}

      {/* SEASONAL */}
      <p className="text-md text-bold">Seasonal</p>
      {["alltime", "summer", "winter"].map((season) => (
        <label key={season} className="text-md">
          <input
            type="radio"
            name="seasonal"
            checked={data.seasonalFilter === season}
            onChange={() => dispatch(setSeasonalFilter(season))}
          />
          {season.toUpperCase()}
        </label>
      ))}

      {/* RATINGS */}
      <p className="text-md text-bold">Ratings</p>
      {[4, 3, 2, 1].map((rate) => (
        <label key={rate} className="text-md">
          <input
            type="radio"
            name="rating"
            onClick={() => dispatch(setRating(rate))}
          />
          {rate} Stars & above
        </label>
      ))}

      {/* SORT */}
      <p className="text-md text-bold">Sort By</p>
      <label className="text-md">
        <input
          type="radio"
          name="sort"
          onClick={() => dispatch(setSortBy("POPULARITY"))}
        />
        Popularity
      </label>
      <label className="text-md">
        <input
          type="radio"
          name="sort"
          onClick={() => dispatch(setSortBy("LOW_TO_HIGH"))}
        />
        Price Low-High
      </label>
      <label className="text-md">
        <input
          type="radio"
          name="sort"
          onClick={() => dispatch(setSortBy("HIGH_TO_LOW"))}
        />
        Price High-Low
      </label>
    </div>
  );
}
