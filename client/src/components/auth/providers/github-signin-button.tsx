import { Button } from "@/components/custom/button";
import { Github } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GithubSigninButton = () => {
  const router = useNavigate();

  return (
    <Button
      onClick={() => router("/api/auth/login/github")}
      className="py-4 flex justify-center items-center gap-2 font-normal"
    >
      <div>
        <Github size={20} />
      </div>
      Sign in with Github
    </Button>
  );
};

export default GithubSigninButton;
