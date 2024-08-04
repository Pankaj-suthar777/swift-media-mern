import { ScrollCards } from "@/components/landing/ScrollCards";
import Header from "@/components/layout/Header";
import { Spotlight } from "@/components/layout/spotlight";
import { useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => state.auth);

  const redirect = () => {
    if (userInfo) {
      navigate("/user/dashboard");
    } else {
      navigate("login");
    }
  };

  return (
    <>
      <div className="h-[80vh]">
        <div className="h-full w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden flex-col">
          <nav className="absolute w-screen top-0 right-0 left-0 flex justify-between p-4 container">
            <Header />
          </nav>
          <div className="mt-10">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="white"
            />
          </div>
          <div className="p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0 sm:my-0 my-auto">
            <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
              Swift Media
              <br /> chat with friends .
            </h1>
            <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
              Join the Fun: Chat with Friends!{" "}
            </p>
          </div>
          <div className="w-full flex justify-center">
            <div className="button-borders sm:mt-10 w-[250px] bg-transparent">
              <button
                className="primary-button w-[250px] bg-transparent sm:mb-0 mb-10"
                onClick={redirect}
              >
                Go To Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <ScrollCards />
      </div>

      {/* second part here*/}
      {/* <div className="w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4"></div>
        <GridSmallBackgroundDemo />
      </div> */}
    </>
  );
};

export default LandingPage;
