import "./categories.css"
import { Link } from "react-router-dom";
import { useData } from "../../contexts";

export default function Category() {
  const { dispatch } = useData();

  return (
    <div className="hero-section">
      <h1 className="categories-heading">Available Categories</h1>
      <Link to="/productlist" className="hero-container link-style-none">
        <img
          src="https://i.postimg.cc/5yB3DGgt/leafy.png"
          className="hero-image"
          alt="Leafy Green"
          onClick={() => dispatch({ type: "LEAFY" })}
        />
        <span className="text-md text-bold">Leafy Green</span>
      </Link>
      <Link to="/productlist" className="hero-container link-style-none">
        <img
          src="https://i.postimg.cc/xTZRhfjC/marrow.png"
          className="hero-image"
          alt="Marrow"
          onClick={() => dispatch({ type: "MARROW" })}
        />
        <span className="text-md text-bold">Marrow</span>
      </Link>
      <Link to="/productlist" className="hero-container link-style-none">
        <img
          src="https://i.postimg.cc/9MxXbNd6/root.png"
          className="hero-image"
          alt="Root"
          onClick={() => dispatch({ type: "ROOT" })}
        />
        <span className="text-md text-bold">Root</span>
      </Link>
      <Link to="/productlist" className="hero-container link-style-none">
        <img
          src="https://i.postimg.cc/0yq6bFcn/allium.png"
          className="hero-image"
          alt="Allium"
          onClick={() => dispatch({ type: "ALLIUM" })}
        />
        <span className="text-md text-bold">Allium</span>
      </Link>
      <Link to="/productlist" className="hero-container link-style-none">
        <img
          src="https://i.postimg.cc/Y25zMpLy/cruciferous.png"
          className="hero-image"
          alt="Cruciferous"
          onClick={() => dispatch({ type: "CRUCIFEROUS" })}
        />
        <span className=" text-md text-bold">Cruciferous</span>
      </Link>
      <Link to="/productlist" className="hero-container link-style-none">
        <img
          src="https://i.postimg.cc/DwTVJkHx/fruits.png"
          className="hero-image"
          alt="Fruits"
          onClick={() => dispatch({ type: "FRUIT" })}
        />
        <span className="text-md text-bold">Fruits</span>
      </Link>
    </div>
  );
}
