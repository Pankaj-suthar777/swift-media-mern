import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { RootState } from "@/store/store";
import { AdminAuthForm } from "@/components/admin/AdminAuthForm";

const AdminLoginPage = () => {
  const { token, userInfo, role } = useAppSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (token && userInfo) {
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }
  }, [token, userInfo, role, navigate]);

  return (
    <div>
      <>
        <div className="container relative grid h-svh flex-col items-center justify-center lg:px-0">
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-left">
                <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email and password below <br />
                  to log into your account
                </p>
              </div>
              <AdminAuthForm />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default AdminLoginPage;
