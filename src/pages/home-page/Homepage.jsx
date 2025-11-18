import "./homepage.css";
import { Category, Banner, Occasional } from "../../components";
import { Loader } from "../../components";
import { useData } from "../../contexts";

export default function HomePage() {
  const { loading, loadText } = useData();
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
