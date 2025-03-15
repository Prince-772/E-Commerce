import React, { useContext, useMemo } from "react";
import { ProductList as ProductListContext } from "../store/E-comm-store";
import ProductCard from "./ProductCard";
import Spinner from "./LoadingSpinner";
import { CartList } from "../store/cartContext";
import { SearchTerm } from "../store/searchContext";

const ProductList = React.memo(() => {
  const { productList, gettingProducts } = useContext(ProductListContext);
  const { searchTerm, filteredList, isSearching } = useContext(SearchTerm);
  const { addToCart, removeFromCart, cartItems } = useContext(CartList);

  console.log("ProductList re-rendered");

  const displayedProducts = useMemo(() => {
    if (searchTerm) return filteredList;
    return productList;
  }, [filteredList, productList]);


  if (gettingProducts || isSearching) {
    return (
      <div className="main-list flex flex-wrap w-full gap-4 px-1 py-0 md:px-8 md:py-5 justify-evenly">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="main-list flex flex-wrap w-full gap-4 px-1 py-0 md:px-8 md:py-5 justify-evenly">
      {displayedProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          brand={product.brand}
          body={product.body}
          price={product.price}
          offer={product.offer}
          img={product.img}
          title={product.title}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          isAdded={cartItems.some((item) => item.id === product.id)}
        />
      ))}
    </div>
  );
})

export default React.memo(ProductList);
