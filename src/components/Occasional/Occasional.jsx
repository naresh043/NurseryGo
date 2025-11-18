import "./occasional.css"
import { Link } from "react-router-dom";
import { useData } from "../../contexts";
export default function Occasional() {
  const { dispatch } = useData();
  return (
    <div className="occasional-products">
      <h1 className="occasional-heading">Special Categories</h1>
      <Link
        to="/productlist"
        className="occasional-item-1 link-style-none flex"
      >
        <span className="text-md text-bold margin-b">
          Alltime available fruits
        </span>
        <img
          src="https://i.postimg.cc/h4L1Dk8D/alltime.jpg"
          alt="Alltime"
          onClick={() => dispatch({ type: "ALLTIME" })}
        />
      </Link>
      <Link
        to="/productlist"
        className="occasional-item-2 link-style-none flex"
      >
        <span className="text-md text-bold margin-b">
          Winter special fruits
        </span>
        <img
          src="https://i.postimg.cc/8PwdWLnx/winter.jpg"
          alt="Winter"
          onClick={() => dispatch({ type: "WINTER" })}
        />
      </Link>
      <Link
        to="/productlist"
        className="occasional-item-3 link-style-none flex"
      >
        <span className="text-md text-bold margin-b">
          Summer special fruits
        </span>
        <img
          src="https://i.postimg.cc/15ycfvMp/summer.jpg"
          alt="Summer"
          onClick={() => dispatch({ type: "SUMMER" })}
        />
      </Link>
    </div>
  );
}
