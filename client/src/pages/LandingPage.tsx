import { BackgroundBeams } from "@/components/layout/background-beams";
import Header from "@/components/layout/Header";
import { Spotlight } from "@/components/layout/spotlight";

const LandingPage = () => {
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
          <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
            <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
              Swift Rivals
              <br /> play with friends.
            </h1>
            <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
              Join the Fun: Play Online Games with Friends!{" "}
            </p>
          </div>
        </div>
      </div>
      {/* second part here*/}
      <div className="h-[40rem] w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4"></div>
        <BackgroundBeams />
      </div>
    </>
  );
};

export default LandingPage;
