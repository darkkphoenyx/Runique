import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <h2 className="text-2xl font-bold">
        Run<span className="text-yellow-300">i</span>que
      </h2>
    </Link>
  );
};

export default Logo;
