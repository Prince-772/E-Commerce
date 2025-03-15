import {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";

const CartList = createContext({
  cartItems: [],
  NumberOfCartItems: 0,
  NumberOfQUantities: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  addQuantity: () => {},
  removeQuantity: () => {},
});

function CartListReducer(currentCartList, action) {
  let newCartList = currentCartList;
  console.log("CartListReducer updated cartItems");
  if (action.type === "ADD_TO_CART") {
    newCartList = [...currentCartList, action.payload];
  } else if (action.type === "REMOVE_FROM_CART") {
    newCartList = currentCartList.filter(
      (item) => item.id !== action.payload.id
    );
  } else if (action.type === "ADD_ONE_QUANTITY") {
    newCartList = currentCartList.map((item) =>
      item.id === action.payload.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else if (action.type === "REMOVE_ONE_QUANTITY") {
    newCartList = currentCartList.map((item) =>
      item.id === action.payload.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
  return newCartList;
}

export default function CartListProvider({ children }) {
  const [NumberOfCartItems, setNumberOfCartItems] = useState(0);
  const [cartItems, dispatchCartList] = useReducer(CartListReducer, []);

  const addToCart = useCallback((item) => {
    dispatchCartList({
      type: "ADD_TO_CART",
      payload: item,
    });
    setNumberOfCartItems((prev) => prev + 1);
  }, []);
  
  const removeFromCart = useCallback((item) => {
    dispatchCartList({
      type: "REMOVE_FROM_CART",
      payload: item,
    });
    setNumberOfCartItems((prev) => prev - 1);
  }, []);

  const addQuantity = useCallback((item) => {
    
      dispatchCartList({
        type: "ADD_ONE_QUANTITY",
        payload: item,
      });
    
  }, []);

  const decreaseQuantity = useCallback((item) => {
    if (item.quantity === 1) {
      removeFromCart(item);
    } else {
      dispatchCartList({
        type: "REMOVE_ONE_QUANTITY",
        payload: item,
      });
    }
  }, []);

  const cartContextValue = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      NumberOfCartItems,
      addQuantity,
      decreaseQuantity,
    }),
    [cartItems]
  );

  return (
    <CartList.Provider value={cartContextValue}>{children}</CartList.Provider>
  );
}
export { CartList };
