import { Button } from "@/components/custom/button";
import { Github } from "lucide-react";

const GithubSigninButton = ({ isSignin = true }: { isSignin?: boolean }) => {
  return (
    <a
      href="https://swift-media-mern.onrender.com/api/auth/github"
      className="flex justify-center items-center gap-2 w-full"
    >
      <Button
        type="button"
        className="py-4 flex justify-center items-center gap-2 font-normal w-full"
      >
        <div>
          <Github size={20} />
        </div>
        Sign {isSignin ? "in " : "up "}with Github
      </Button>
    </a>
  );
};

export default GithubSigninButton;
