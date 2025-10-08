import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const SecondaryButton = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <Button
      className={cn(
        `bg-black hover:bg-black mt-6 rounded-lg font-medium active:scale-95 transition-all cursor-pointer ${className}`
      )}
    >
      {title}
    </Button>
  );
};

export default SecondaryButton;
