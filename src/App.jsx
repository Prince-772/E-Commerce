import React, { useState, useContext } from "react";
import "./App.css";
import NavBar from "./components/Navbar";
import SideBar from "./components/SideBar";
import ECommerceProvider from "./store/E-comm-store";
import { Outlet } from "react-router-dom";
import CartListProvider from "./store/cartContext";
import SideBarProvider from "./store/SideBarContext";
import RelProductsListProvider from "./store/RelatedProductsListContext";
import SearchTermProvider from "./store/searchContext";
function App() {
  return (
    <ECommerceProvider>
      <CartListProvider>
        <SideBarProvider>
          <RelProductsListProvider>
            <SearchTermProvider>
              <NavBar />
              <SideBar />
              <main className="mt-22 md:mt-18 w-full">
                <Outlet />
              </main>
            </SearchTermProvider>
          </RelProductsListProvider>
        </SideBarProvider>
      </CartListProvider>
    </ECommerceProvider>
  );
}

export default App;
