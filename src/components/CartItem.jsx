import { Link } from "react-router-dom";
import { CartList as CartListContext } from "../store/cartContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useContext } from "react";
function CartItem({ item }) {
  const { addQuantity, decreaseQuantity } = useContext(CartListContext);

  return (
    <div className="relative group cart-item flex gap-4 border border-gray-300 rounded-lg py-1 px-1.5 md:p-3 shadow-md bg-white">
      {/* Image */}
      <Link to={`/product/${item.id}`}>
        <div className="image-box w-24 h-24 md:h-full md:w-35 border-2 border-black rounded-lg overflow-hidden shrink-0 my-auto group-hover:scale-110 group-hover:shadow-md shadow-black transition-all duration-300">
          <img
            className="w-full h-full object-cover"
            src={item.img}
            alt="Product"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="detail-box flex flex-col justify-between flex-1">
        <div>
          <p className="title font-bold text-md md:text-lg text-gray-800 line-clamp-1">
            {item.title}
          </p>
          <p className="description text-sm text-gray-600 font-semibold line-clamp-1">
            {item.body}
          </p>
          <p className="price text-sm md:text-md font-bold text-green-700 mt-1 md:mt-4">
            {item.price} x {item.quantity} = ₹
            {(item.price.slice(1).replace(/,/g,"") * item.quantity).toLocaleString()}
          </p>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-1">
            <p className="price text-md md:text-lg font-bold text-red-600 text-nowrap">
              {item.offer}
            </p>
            <p className="price text-sm md:text-base font-bold text-gray-600 text-nowrap line-through">
              ₹{getActualPrice(item.price, item.offer)}
            </p>
          </div>

          {/* Quantity Selector */}
          <div
            className="flex items-center border border-gray-400 rounded-md text-black text-sm md:gap-2 bg-gray-100">
            <button
              className="p-1 md:p-2 w-full rounded-md hover:bg-gray-200 transition cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                decreaseQuantity(item);
              }}
            >
              <FaMinus className="w-4 h-4" />
            </button>
            <span className="px-1 md:px-2 font-semibold text-gray-800 text-base">
              {item.quantity}
            </span>
            <button
              className={`p-1 md:p-2 w-full rounded-md hover:bg-gray-200 transition cursor-pointer ${
                item.quantity >= 10 ? "opacity-30" : "opacity-100"
              }`}
              disabled={item.quantity >= 10 ? true : false}
              onClick={(event) => {
                event.preventDefault();
                addQuantity(item)
              }}
            >
              <FaPlus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function getActualPrice(product_price, product_offer) {
  let price = Number(product_price.slice(1).replace(/,/g,""));
  let offer = Number(product_offer.slice(0, -1));
  return (Math.floor((price * 100) / (100 - offer))).toLocaleString();;
}
export default CartItem;
