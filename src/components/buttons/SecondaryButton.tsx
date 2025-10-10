import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const SecondaryButton = ({
  title,
  className,
  disabled,
}: {
  title: string;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <Button
      disabled={disabled}
      className={cn(
        `bg-black hover:bg-white mt-6 rounded-lg font-medium active:scale-[98%] hover:text-black border-black transition-all cursor-pointer ${className}`
      )}
    >
      {title}
    </Button>
  );
};

export default SecondaryButton;
