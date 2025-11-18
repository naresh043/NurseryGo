import "./filter.css";
import { useData } from "../../contexts";

export default function Filter() {
  const { data, dispatch } = useData();

  return (
    <div className="filter-section">
      <section className="filter-headings">
        <p className="text-lg text-bold">Filters</p>
        <button
          className="btn btn-solid-primary clear-filter"
          onClick={() => dispatch({ type: "CLEAR" })}
        >
          Clear
        </button>
      </section>
      <p className="text-md text-bold">Price</p>
      <div className="range-slider">
        <input
          type="range"
          min="0"
          max="200"
          step="20"
          value={data.price}
          onChange={(e) => dispatch({ type: "PRICE", payload: e.target.value })}
        />
        <i className="fa fa-inr margin-l text-sm">.</i>
        <span className="range-value text-md text-bold">{data.price}</span>
      </div>
      <p className="text-md text-bold">Categories</p>
      {data.categories.map((item) => {
        let category = item.categoryName.toLowerCase();
        return (
          <label className="text-md" key={item._id}>
            <input
              type="checkbox"
              name="category"
              className="margin-r"
              checked={data[category] === true}
              onChange={() =>
                dispatch({ type: item.categoryName.toUpperCase() })
              }
            />
            {item.categoryName}
          </label>
        );
      })}
      <p className="text-md text-bold">Seasonal</p>
      <label className="text-md">
        <input
          type="checkbox"
          name="seasonal"
          className="margin-r"
          checked={data.alltime === true}
          onChange={() => dispatch({ type: "ALLTIME" })}
        />
        All Time
      </label>
      <label className="text-md">
        <input
          type="checkbox"
          name="seasonal"
          className="margin-r"
          checked={data.summer === true}
          onChange={() => dispatch({ type: "SUMMER" })}
        />
        Summer
      </label>
      <label className="text-md">
        <input
          type="checkbox"
          name="seasonal"
          className="margin-r"
          checked={data.winter === true}
          onChange={() => dispatch({ type: "WINTER" })}
        />
        Winter
      </label>
      <p className="text-md text-bold">Ratings</p>
      <label className="text-md">
        <input
          type="radio"
          name="rating"
          className="margin-r"
          onClick={() => dispatch({ type: "RATING", payload: 4 })}
        />
        4 Stars & above
      </label>
      <label className="text-md">
        <input
          type="radio"
          name="rating"
          className="margin-r"
          onClick={() => dispatch({ type: "RATING", payload: 3 })}
        />
        3 Stars & above
      </label>
      <label className="text-md">
        <input
          type="radio"
          name="rating"
          className="margin-r"
          onClick={() => dispatch({ type: "RATING", payload: 2 })}
        />
        2 Stars & above
      </label>
      <label className="text-md">
        <input
          type="radio"
          name="rating"
          className="margin-r"
          onClick={() => dispatch({ type: "RATING", payload: 1 })}
        />
        1 Star & above
      </label>
      <p className="text-md text-bold">Sort By</p>
      <label className="text-md">
        <input
          type="radio"
          name="sort"
          className="margin-r"
          onClick={() => dispatch({ type: "SORT" })}
        />
        Popularity
      </label>
      <label className="text-md">
        <input
          type="radio"
          name="sort"
          className="margin-r"
          onClick={() => dispatch({ type: "SORT", payload: "LOW_TO_HIGH" })}
        />
        Price Low-High
      </label>
      <label className="text-md">
        <input
          type="radio"
          name="sort"
          className="margin-r"
          onChange={() => dispatch({ type: "SORT", payload: "HIGH_TO_LOW" })}
        />
        Price High-Low
      </label>
    </div>
  );
}
