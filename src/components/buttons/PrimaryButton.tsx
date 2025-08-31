import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const PrimaryButton = ({ title, link }: { title: string; link: string }) => {
  return (
    <Link to={link}>
      <Button className="active:translate-y-1 transition-all">{title}</Button>
    </Link>
  );
};

export default PrimaryButton;
