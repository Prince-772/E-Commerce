import { createContext, useReducer,useContext } from "react";
import {ProductList} from "./E-comm-store"
const RelatedProductsList = createContext({
  relatedProducts: [],
  updateRelatedProducts: () => {},
});

function RelatedProductsReducer(currList, action) {
  let RelatedProducts = [];
  if (action.type === "UPDATE_RELATED_PRODUCTS") {
    let selectedProduct = action.payload;
    let selectedProduct_categories = selectedProduct.category;
    selectedProduct_categories.forEach((category) => {
      action.fullList.forEach((product) => {
        if (
          !(product.id === selectedProduct.id) &&
          !RelatedProducts.some((relProduct) => relProduct.id === product.id) &&
          product.category.includes(category)
        ) {
          RelatedProducts.push(product);
        }
      });
    });
    return RelatedProducts;
  }
  return currList;
}

export default function RelProductsListProvider({ children }) {
  const [relatedProductList, dispatchRelatedProductList] = useReducer(
    RelatedProductsReducer,
    []
  );
 const {productList} = useContext(ProductList)

  function updateRelatedProducts(selectedProduct) {
    
    dispatchRelatedProductList({
      type: "UPDATE_RELATED_PRODUCTS",
      payload: selectedProduct,
      fullList: productList,
    });
  }

  return (
    <RelatedProductsList.Provider
      value={{ relatedProductList, updateRelatedProducts }}
    >
      {children}
    </RelatedProductsList.Provider>
  );
}
export {RelatedProductsList}