import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useAppSelector } from "@/store/hooks";
import { Link } from "react-router-dom";

export default function Header() {
  const { userInfo } = useAppSelector((state) => state.auth);

  console.log(userInfo);
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 z-50">
      <Sheet>
        <div className="w-full flex justify-between">
          <Link
            to="/"
            className="no-underline text-black mr-6 flex justify-center items-center"
          >
            <MountainIcon className="h-6 w-6" />
            <span className="ml-4 text-white font-light">Swift Chat Pro</span>
          </Link>
          <SheetTrigger asChild>
            <span className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </span>
          </SheetTrigger>
        </div>
        <SheetContent side="left">
          <Link to="#" className="mr-6 hidden lg:flex">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-2 py-6">
            <Link
              to="#"
              className="flex w-full items-center py-2 text-lg font-semibold"
            >
              Home
            </Link>
            <Link
              to="#"
              className="flex w-full items-center py-2 text-lg font-semibold"
            >
              About
            </Link>

            <Link
              to="#"
              className="flex w-full items-center py-2 text-lg font-semibold"
            >
              Contact
            </Link>
            {userInfo ? (
              <Link
                to="/user/dashboard"
                className="flex w-full items-center py-2 text-lg font-semibold"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex w-full items-center py-2 text-lg font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <nav className="ml-auto hidden lg:flex gap-6">
        <Link
          className="header-btn relative inline-flex px-4 py-2 text-sm h-9 w-max items-center justify-center font-medium text-white border-3 border-pink-500 cursor-pointer bg-transparent overflow-hidden z-10"
          to="#"
        >
          Home
        </Link>
        <Link
          className="header-btn relative inline-flex px-4 py-2 text-sm h-9 w-max items-center justify-center font-medium text-white border-3 border-pink-500 cursor-pointer bg-transparent overflow-hidden z-10"
          to="#"
        >
          About
        </Link>

        <Link
          className="header-btn relative inline-flex px-4 py-2 text-sm h-9 w-max items-center justify-center font-medium text-white border-3 border-pink-500 cursor-pointer bg-transparent overflow-hidden z-10 "
          to="#"
        >
          Contact
        </Link>
        {userInfo ? (
          <Link
            className="header-btn relative inline-flex px-4 py-2 text-sm h-9 w-max items-center justify-center font-medium text-white border-3 border-pink-500 cursor-pointer bg-transparent overflow-hidden z-10"
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            className="header-btn relative inline-flex px-4 py-2 text-sm h-9 w-max items-center justify-center font-medium text-white border-3 border-pink-500 cursor-pointer bg-transparent overflow-hidden z-10"
            to="/login"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      color="white"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      color="white"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
