import React, { StrictMode } from "react";
import App from "./App.jsx";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductList from "./components/ProductList.jsx";
import ProductDetails from "./components/ProductDetail.jsx";
import CartList from "./components/CartList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ProductList /> },
      { path: "/product/:productId", element: <ProductDetails /> },
      { path: "/cart", element: <CartList /> },
      { path: "/orders", element: <div className="text-green-600 font-[poppins] font-semibold w-full text-center text-5xl border-b-2"> <p className="inline-block animate-bounce">Adding Soon</p></div> },
      { path: "/profile", element: <div className="text-green-600 font-[poppins] font-semibold w-full text-center text-5xl border-b-2"> <p className="inline-block animate-bounce">Adding Soon</p></div> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
);
