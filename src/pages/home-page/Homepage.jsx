import "./homepage.css";
import { Category, Banner, Occasional } from "../../components";
import { Loader } from "../../components";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { loading, loadText } = useSelector((state) => state.data);
  return (
    <div className="grid-container">
      {loading ? (
        <Loader text={loadText} />
      ) : (
        <>
          <Category />
          <Banner />
          <Occasional />
        </>
      )}
    </div>
  );
}
