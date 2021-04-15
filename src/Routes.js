import { Route, Routes } from "react-router-dom";
import { Home, ProductsDisplay, Wishlist, CartItems } from "./Components";
export const RouteProvider = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/products" element={<ProductsDisplay />} />
      <Route exact path="/wishlist" element={<Wishlist />} />
      <Route exact path="/cartitems" element={<CartItems />} />
    </Routes>
  );
};
