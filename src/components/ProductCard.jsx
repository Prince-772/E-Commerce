import { CiHeart } from "react-icons/ci";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import React from "react";

const ProductCard = React.memo(({ brand, body, price, offer, img, id, title,addToCart, removeFromCart, isAdded }) => {
  console.log("ProductCard re-rendered", id);
  return (
    <div className="group flex-grow md:flex-grow-0 border border-gray-200 flex flex-col w-75 rounded-lg bg-white cursor-pointer hover:shadow-xl shadow-gray-700 transition-all duration-300 overflow-hidden relative">
  <Link to={`/product/${id}`}>
    {/* Product Image with Hover Effect */}
    <div className="top relative overflow-hidden rounded-md">
      <img
        className="group-hover:scale-110 object-cover transition-transform duration-300 ease-in-out"
        src={img}
        alt="IMG"
        loading="lazy"
      />
      <CiHeart
        className={`${styles.favBtn} absolute top-3 right-3 w-8 h-8 cursor-pointer text-gray-500 hover:text-red-500 transition-all duration-200 transform hover:scale-125`}
      />
    </div>

    {/* Product Info */}
    <div className="footer px-4 py-3 flex flex-col bg-white">
      <div className="brand text-md md:text-lg font-semibold font-[roboto] text-gray-800 line-clamp-1">
        {title}
      </div>
      <div className="details text-sm md:text-md font-[Arial] text-gray-500 line-clamp-2">
        {body}
      </div>

      {/* Price Section */}
      <div className="prices flex gap-2 items-center font-[roboto] mt-2">
        <span className="Offer-Price text-black font-bold text-lg">
          {price}
        </span>
        <span className="actual-price line-through text-[12px] font-bold text-gray-400">
          ₹{getActualPrice(price, offer)}
        </span>
        <span className="percentage-offer text-green-600 font-bold font-[poppins] ml-4">
          {offer} OFF
        </span>
      </div>
    </div>

    {/* Buttons */}
    <div className="btns flex justify-evenly text-[12px] md:text-md p-3">
      <button className="btn py-2 px-4 rounded-lg cursor-pointer bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold shadow-md hover:shadow-lg transition-all">
        Buy Now
      </button>
      <button
        className={`btn py-2 px-4 rounded-lg cursor-pointer text-white font-semibold shadow-md hover:shadow-lg transition-all ${
          isAdded
            ? "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
            : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
        }`}
        onClick={(event) =>
          handleCartAddRemove(event, { brand, body, price, offer, img, id, title }, isAdded, addToCart, removeFromCart)
        }
      >
        {isAdded ? "Remove From Cart" : "Add To Cart"}
      </button>
    </div>
  </Link>
</div>

  );
})

const handleCartAddRemove = (e, product, isAdded, addToCart, removeFromCart) => {
  e.stopPropagation();
  e.preventDefault();
  if (isAdded) {
    removeFromCart({ id: product.id });
  } else {
    addToCart({ ...product, actualPrice: getActualPrice(product.price, product.offer), quantity: 1 });
  }
};

function getActualPrice(product_price, product_offer) {
  // console.log(product_price,product_offer);
  
  let price = Number(product_price.slice(1).replace(/,/g,""));
  let offer = Number(product_offer.slice(0, -1));
  // console.log(price,offer);
  return (Math.floor((price * 100) / (100 - offer))).toLocaleString();;
}
export default ProductCard;
