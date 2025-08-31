import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const SecondaryButton = ({
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
          `bg-black hover:bg-black mt-6 rounded-lg font-medium active:scale-95 transition-all cursor-pointer ${className}`
        )}
      >
        {title}
      </Button>
    </Link>
  );
};

export default SecondaryButton;
