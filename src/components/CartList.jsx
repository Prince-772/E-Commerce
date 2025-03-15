import CratItem from "./CartItem";
import { CartList as CartListContext } from "../store/cartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Pricing from "./PriceDetails";
function CartList() {
  const { cartItems } = useContext(CartListContext);
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col gap-4 mt-20 items-center">
        <p className="msg text-lg mg:text-xl text-black font-semibold">
          Your Cart Is Empty
        </p>
        <Link
          to="/"
          className="border border-sky-600 px-2 py-1 rounded-md bg-green-700 hover:bg-green-800 text-white"
        >
          Add Items
        </Link>
      </div>
    );
  }
  return (
    <div className="cart-list p-2 flex gap-3 justify-between flex-col md:flex-row">
      <div className="items flex flex-col gap-3 flex-1 overflow-y-auto">
        <h1 className="text-center md:hidden font-semibold text-xl">Your Cart</h1>
        {cartItems.map((item) => (
          <CratItem key={item.id} item={item} />
        ))}
      </div>
      <div className="pricing md:w-70 lg:w-90 relative" >
        <Pricing />
      </div>
    </div>
  );
}
export default CartList;
