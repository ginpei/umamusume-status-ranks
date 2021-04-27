import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  return (
    <div className="HomePage">
      <h1>HomePage</h1>
      <p>
        <Link to="/about/">About</Link>
      </p>
    </div>
  );
};
