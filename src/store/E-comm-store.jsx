import { createContext, useState, useEffect, useMemo } from "react";

const ProductList = createContext();

function ECommerceProvider({ children }) {
  const [productList, setProductList] = useState([]);
  const [gettingProducts, setGettingProducts] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchProducts = async () => {
      try {
        setGettingProducts(true);
        const response = await fetch("/caption.json", { signal });
        let products = await response.json();
        // products = products.filter(item => item.category.some(cat => cat === "men" || cat === "man")).slice(0,10)
        setGettingProducts(false);
        setProductList(products);
      } catch (err) {
        if (err.name !== "AbortError") {
          throw new Error(err);
        }
      }
    };
    fetchProducts();

    return () => {
      controller.abort();
      console.log("Aborting...");
    };
  }, []);

 
  const productContextValue = useMemo(() => ({
    productList,
    gettingProducts,
  }), [ gettingProducts]);

  return (
      <ProductList.Provider value={productContextValue}>
              {children}
      </ProductList.Provider>
  );
  
}

export default ECommerceProvider;
export { ProductList };
