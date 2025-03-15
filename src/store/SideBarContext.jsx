import { createContext, useState } from "react";

const ToggleSideBar = createContext();
export default function SideBarProvider({ children }) {
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  return (
    <ToggleSideBar.Provider value={{ isSideBarOpen, setSideBarOpen }}>
      {children}
    </ToggleSideBar.Provider>
  );
}
export {ToggleSideBar}
