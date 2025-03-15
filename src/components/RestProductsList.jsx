import ProductCard from "./ProductCard";
function RestProductsList({ restItemsList,addToCart, removeFromCart ,cartItems}) {
  return (
    <div className="flex flex-wrap w-full gap-4 px-1 py-0 md:px-8 md:py-5 justify-evenly">
      {restItemsList.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          brand={product.brand}
          body={product.body}
          price={product.price}
          offer={product.offer}
          img={product.img}
          title={product.title}
          addToCart = {addToCart}
          removeFromCart = {removeFromCart}
          isAdded = {cartItems.some(item => item.id === product.id)}
        />
      ))}
    </div>
  );
}
export default RestProductsList;
