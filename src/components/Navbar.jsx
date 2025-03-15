import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { ToggleSideBar } from "../store/SideBarContext";
import { CartList } from "../store/cartContext";
import { IoHome, IoCart, IoStorefront, IoPersonCircle } from "react-icons/io5";
import Search from "./searchLogic";
function NavBar() {
  const location = useLocation();
  const { isSideBarOpen, setSideBarOpen } = useContext(ToggleSideBar);
  const { NumberOfCartItems } = useContext(CartList);
  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 shadow-lg shadow-gray-800/50 p-1 md:px-5">
      <div className="flex flex-col md:flex-row justify-between h-18 md:h-12 items-center md:gap-4">
        {/* Left Section - Hamburger & Logo */}
        <div className="flex items-center gap-4 w-full justify-between md:max-w-[77px] px-2 md:px-0 mt-1 md:mt-0">
          <div className="flex gap-2 ">
            <GiHamburgerMenu
              className="h-6 w-6 cursor-pointer md:hidden text-white"
              onClick={() => setSideBarOpen(!isSideBarOpen)}
            />
            <div className="logo w-[77px]">
              <Link to="/">
                <img
                  className="h-6 md:h-8"
                  src="/logo/PKart logo.png"
                  alt="PKart"
                />
              </Link>
            </div>
          </div>
          {/* Cart Icon Only For device width less than 768px*/}
          <div className="flex md:hidden">
            <Link
              to="/cart"
              className={`${
                location.pathname === "/cart"
                  ? "border-b-blue-900 rounded-0"
                  : "hover:border-sky-300 rounded-md"
              } scale-110 relative hover:scale-105 transition-transform border-transparent border-3 duration-200 px-2 flex items-center gap-1 text-white`}
            >
              <IoCart className="scale-[1.2]" />
              Cart
              {NumberOfCartItems ? (
                <div
                  className={`badge absolute -right-1 -top-1 ${
                    NumberOfCartItems > 99 ? "w-6" : "w-4"
                  } h-4 flex items-center justify-center rounded-lg border text-[10px] bg-red-600`}
                >
                  {NumberOfCartItems > 99 ? "99+" : NumberOfCartItems}
                </div>
              ) : null}
            </Link>
          </div>
        </div>

        {/* Middle Section - Search Bar */}
        <Search />

        {/* Right Section - Navigation */}
        <div className="hidden md:flex gap-1 lg:gap-5 md:text-base lg:text-lg font-semibold">
          <Link
            to="/"
            className={`${
              location.pathname === "/" ? "border-b-blue-900 rounded-0" : "hover:border-sky-300 rounded-md"
            } hover:scale-105 transition-transform border-transparent  border-3 duration-200 md:px-2 flex items-center gap-1 text-white`}
          >
            <IoHome />
            Home
          </Link>
          <Link
            to="/cart"
            className={`${
              location.pathname === "/cart"
                ? "border-b-blue-900 rounded-0"
                : "hover:border-sky-300 rounded-md"
            } relative hover:scale-105 transition-transform border-transparent border-3 duration-200 md:px-2 flex items-center gap-1 text-white`}
          >
            <IoCart className="scale-[1.2]" />
            Cart
            {NumberOfCartItems ? (
              <div
                className={`badge absolute -right-1 -top-1 ${
                  NumberOfCartItems > 99 ? "w-6" : "w-4"
                } h-4 flex items-center justify-center rounded-lg border text-[10px] bg-red-600`}
              >
                {NumberOfCartItems > 99 ? "99+" : NumberOfCartItems}
              </div>
            ) : null}
          </Link>
          <Link
            to="/orders"
            className={`${
              location.pathname === "/orders"
                ? "border-b-blue-900 rounded-0"
                : "hover:border-sky-300 rounded-md"
            } hover:scale-105 transition-transform border-transparent border-3 duration-200 md:px-2 flex items-center gap-1 text-white`}
          >
            <IoStorefront />
            Orders
          </Link>
          <Link
            to="/profile"
            className={`${
              location.pathname === "/profile"
                ? "border-b-blue-900 rounded-0"
                : "hover:border-sky-300 rounded-md"
            } hover:scale-105 transition-transform border-transparent border-3 duration-200 md:px-2 flex items-center gap-1 text-white`}
          >
            <IoPersonCircle className="scale-[1.2]" />
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
