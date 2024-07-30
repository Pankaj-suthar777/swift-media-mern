import { useNavigate } from "react-router-dom";
import { Button } from "../custom/button";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      className="flex gap-2 text-md bg-slate-100"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft color="black" /> Back
    </Button>
  );
};

export default BackButton;
