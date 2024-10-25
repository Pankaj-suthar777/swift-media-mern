import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser, UserInfo } from "@/store/features/userSlice";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProviderRedirectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      localStorage.setItem("accessToken", token);
      const decodedToken: UserInfo = jwtDecode(token);
      dispatch(setUser(decodedToken));
      navigate("/user/posts");
    }
  }, [dispatch, navigate]);
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Loader size={32} className="animate-spin" />
    </div>
  );
};

export default ProviderRedirectPage;
