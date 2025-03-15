import { useContext } from "react";
import { CartList } from "../store/cartContext";
import {Link} from "react-router-dom"


function Pricing() {
  const {cartItems} = useContext(CartList)
  
  const NumberOfQUantities = cartItems.reduce((sum,item)=> sum + item.quantity, 0)
  const TotalPrice = cartItems.reduce((sum,item)=> sum + item.actualPrice.replace(/,/g,"") * item.quantity, 0)
  const Discount = cartItems.reduce((sum,item)=> sum + (item.actualPrice.replace(/,/g,"") - item.price.slice(1).replace(/,/g,"") )*(item.quantity), 0)
  const Taxes = Math.ceil((TotalPrice - Discount) * 3)/100
  const FinalPrice = TotalPrice - Discount + Taxes
    
  return (
    <div className="pricing bg-white shadow-md rounded-lg p-4 md:max-w-md mx-auto border-2 bolder-black md:sticky top-20 left-0">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 border-b pb-2 text-center">Order Summary</h2>
      
      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between font-medium text-sm md:text-base">
          <span>PKart Price ({NumberOfQUantities} {NumberOfQUantities>1?"Items":"Item"}):</span>
          <p className="text-gray-900 font-semibold">₹{TotalPrice}</p>
        </div>
        <div className="flex justify-between text-green-600 font-medium text-sm md:text-base">
          <span>Discount:</span>
          <p>- ₹{Discount}</p>
        </div>
        <div className="flex justify-between text-sm md:text-base">
          <span>Packaging Charge:</span>
          <p>₹0</p>
        </div>
        <div className="flex justify-between text-sm md:text-base">
          <span>Shipping Charge:</span>
          <p>₹0</p>
        </div>
        <div className="flex justify-between text-sm md:text-base">
          <span>Taxes(3% GST):</span>
          <p>₹{Taxes}</p>
        </div>
      </div>

      <div className="flex justify-between text--base md:text-lg font-bold text-gray-900 border-t pt-3 mt-3">
        <span>Final Price:</span>
        <p className="text-blue-600">₹{Math.ceil(FinalPrice * 100) / 100}</p>
      </div>
      <div className="finish bg-blue-500 w-full border border-black rounded-md font-semibold text-white h-8 mt-1 hover:bg-blue-600"><Link to="/place-order" className="w-full h-full flex justify-center items-center">Place Order</Link></div>
    </div>
  );
}

export default Pricing;