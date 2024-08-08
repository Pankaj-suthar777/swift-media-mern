import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "../custom/button";
import { ChevronLeft } from "lucide-react";

const BackButton = ({
  to,
  variant = "outline",
}: {
  to?: string;
  variant?: ButtonProps["variant"];
}) => {
  const navigate = useNavigate();

  return (
    <Button
      variant={variant}
      className="flex gap-2 text-md bg-slate-100"
      onClick={() => {
        if (to) {
          navigate(to);
        } else {
          navigate(-1);
        }
      }}
    >
      <ChevronLeft color="black" /> Back
    </Button>
  );
};

export default BackButton;
