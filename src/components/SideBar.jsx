import { Link } from "react-router-dom";
import { useContext } from "react";
import { ToggleSideBar } from "../store/SideBarContext";
import {
  IoHome,
  IoCart,
  IoStorefront,
  IoPersonCircle,
} from "react-icons/io5";

function SideBar(){
  const {isSideBarOpen} = useContext(ToggleSideBar)

  return(
    <div className={`fixed border top-0 left-0 z-40 shadow-lg shadow-gray-500/50 pt-25 w-1/2 min-w-55 max-w-76 text-nowrap md:hidden flex flex-col gap-4 font-bold font-[sans-serif] items-center bg-blue-500 h-[100vh] ${isSideBarOpen?"translate-x-0":"-translate-x-full"} transition-transform duration-300`}>
      <Link to="/" className="bg-gray-300 h-9 rounded-md flex items-center justify-center w-[90%] active:bg-green-500 gap-1"><IoHome />Home</Link>
      <Link to="/cart" className="bg-gray-300 h-9 rounded-md flex items-center justify-center w-[90%] active:bg-green-500 gap-1"><IoCart className="scale-[1.2]" />Cart</Link>
      <Link to="/orders" className="bg-gray-300 h-9 rounded-md flex items-center justify-center w-[90%] active:bg-green-500 gap-1"><IoStorefront />Orders</Link>
      <Link to="/profile" className="bg-gray-300 h-9 rounded-md flex items-center justify-center w-[90%] active:bg-green-500 gap-1"><IoPersonCircle className="scale-[1.2]"/>Profile</Link>
    </div>
  )
}
export default SideBar