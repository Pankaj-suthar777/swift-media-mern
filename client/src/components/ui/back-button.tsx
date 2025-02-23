import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "../custom/button";
import { ChevronLeft } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const BackButton = ({
  to,
  variant = "outline",
  showText = true,
  className,
}: {
  to?: string;
  variant?: ButtonProps["variant"];
  showText?: boolean;
  className?: string;
}) => {
  const navigate = useNavigate();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            className={cn("flex gap-2 text-md bg-slate-100", className)}
            onClick={() => {
              if (to) {
                navigate(to);
              } else {
                navigate(-1);
              }
            }}
          >
            <ChevronLeft color="black" />
            {showText && <span>Back</span>}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="ml-4">
          <p>Back</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BackButton;
