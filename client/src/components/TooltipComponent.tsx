import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface Props {
  children: React.ReactNode;
  Content: React.ReactNode;
}

export function TooltipComponent({ children, Content }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{Content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
