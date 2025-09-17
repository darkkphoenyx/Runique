import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const PrimaryButton = ({
  title,
  link,
  className,
}: {
  title: string;
  link: string;
  className?: string;
}) => {
  return (
    <Link to={link}>
      <Button
        className={cn(
          `bg-red-600 hover:bg-red-700 text-lg font-medium transition-all active:scale-95 cursor-pointer w-full  ${className}`
        )}
      >
        {title}
      </Button>
    </Link>
  );
};

export default PrimaryButton;
