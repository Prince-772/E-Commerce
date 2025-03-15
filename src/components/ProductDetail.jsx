import { useContext, useEffect } from "react";
import {
  ProductList as ProductListContext,
} from "../store/E-comm-store";
import {
  CartList as CartListContext} from "../store/cartContext"
import { RelatedProductsList} from "../store/RelatedProductsListContext"
import { useParams } from "react-router-dom";
import RestProductsList from "./RestProductsList";

function ProductDetails() {
  const { productList } = useContext(ProductListContext);
  const { addToCart, removeFromCart ,cartItems } = useContext(CartListContext);
  const { productId } = useParams();
  const product = productList.find((p) => p.id === productId);
  const isAdded = cartItems.some(item => item.id === productId);
  const { relatedProductList, updateRelatedProducts } =
    useContext(RelatedProductsList);
    
  function haldleCartAddRemove(e, item,isAdded) {
    e.stopPropagation();
    e.preventDefault();
    if (isAdded) {
      removeFromCart({ id: item.id });
    } else {
      addToCart({
        title: item.title,
        img: item.img,
        id: item.id,
        offer: item.offer,
        price: item.price,
        body: item.body,
        brand: item.brand,
        actualPrice: getActualPrice(item.price, item.offer),
        quantity: 1,
      });
    }
  }

  useEffect(() => {
    if (product) updateRelatedProducts(product);
  }, [product, productList]);

  if (!product) {
    return (
      <div className="text-center text-red-500 text-xl font-bold mt-20">
        Product not found
      </div>
    );
  }

  return (
    <>
      <div className="main px-3 md:py-6 md:px-10 flex flex-col md:flex-row gap-6">
        {/* Left Side - Product Image */}
        <div className="left w-full md:w-1/2 flex justify-center">
          <img
            src={product.img}
            alt={product.title}
            className="img w-full h-full md:max-h-150 object-cover border-2 border-gray-300 rounded-lg"
          />
        </div>

        {/* Right Side - Product Details */}
        <div className="right w-full md:w-1/2 flex flex-col gap-1 px-1">
          <h2 className="brand text-xl font-black text-gray-800">
            {product.brand}
          </h2>
          <h3 className="title text-lg font-semibold">{product.title}</h3>
          <p className="description text-gray-600">{product.body}</p>

          {/* Price & Offer */}
          <div className="flex items-center gap-2">
            <span className="text-green-700 font-bold text-lg">
              {product.price}
            </span>
            <span className="line-through text-gray-500 text-sm">
              ₹{getActualPrice(product.price, product.offer)}
            </span>
            <span className="text-red-600 font-bold text-sm">
              {product.offer} OFF
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 my-4 justify-evenly">
            <button className="btn bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-lg">
              Buy Now
            </button>
            <button className={`btn border-2 py-1 px-3 flex items-center rounded-[10px] cursor-pointer ${
              isAdded
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-700 hover:bg-blue-800"
            } text-white font-semibold`}
            onClick={(event) => haldleCartAddRemove(event,product,isAdded)}>
              {isAdded?"Remove From Cart":"Add To Cart"}
            </button>
          </div>
        </div>
      </div>
      <hr className="mx-3" />

      <div className="suggestions mt-8">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-5">
          Related Products
        </h2>
        <RestProductsList restItemsList={relatedProductList} addToCart={addToCart} removeFromCart={removeFromCart} cartItems={cartItems}/>
      </div>
    </>
  );
}

// Helper function to calculate original price
function getActualPrice(price, offer) {
  let numPrice = Number(price.slice(1).replace(/,/g, ""));
  let numOffer = Number(offer.slice(0, -1));
  return Math.floor((numPrice * 100) / (100 - numOffer)).toLocaleString();
}

export default ProductDetails;
