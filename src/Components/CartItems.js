import { useContent } from "../Context";
import * as React from "react";
import "./Component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
export default function CartItems() {
  const { state, setShowToast, setToastMsg, dispatch } = useContent();
  const isProductinWishlist = (productid) =>
    state.wishItems.findIndex((item) => item.id === productid) === -1
      ? true
      : false;
  const cartLength = state.cartItems.length;
  console.log(cartLength);
  return (
    <div class="mt">
      <div class="container">
        {cartLength === 0 ? (
          <h3>NO ITEMS IN CART</h3>
        ) : (
          <div class="cart-detail">
            Total Amount : Rs.
            {state.cartItems.reduce(
              (sum, item) => sum + item.price * item.qty,
              0
            )}
          </div>
        )}
        <ul class="card-list">
          {state.cartItems.map((item) => (
            <li key={item.id} class="cart-list-item position-rel">
              <button
                class="cart-wish-after"
                onClick={async () => {
                  setShowToast(true);
                  setToastMsg(`${item.name} removed from cart`);
                  dispatch({
                    type: "REMOVEFROMCART",
                    payload: item
                  });
                }}
              >
                <div class="close-cart-before">{"X"}</div>
              </button>
              <div class="cart-img">
                <img class="img" src={item.image} alt={item.name} />
              </div>
              <div class="cart-info mt-cart">
                <div class="cart-heading">{item.name}</div>
                <div class="cart-detail">Unit Price: {item.price}</div>

                <span
                  onClick={() => {
                    dispatch({ type: "INCREASEQTY", payload: item });
                  }}
                  role="button"
                  class="cart-btn"
                >
                  +
                </span>
                <span class="cart-qty">{item.qty}</span>
                <span
                  onClick={() => {
                    dispatch({ type: "DECREASEQTY", payload: item });
                  }}
                  role="button"
                  class="cart-btn"
                >
                  -
                </span>

                <div class="cart-detail">
                  Item Total: {item.qty * item.price}
                </div>
              </div>
              <div class="mr-small product-footer">
                {isProductinWishlist(item.id) ? (
                  <button
                    class=" wish-cart-before"
                    onClick={async () => {
                      setShowToast(true);
                      setToastMsg(`${item.name} moved to wishlist`);
                      dispatch({ type: "CARTTOWISH", payload: item });
                    }}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                ) : (
                  <button
                    class=" wish-cart-after"
                    onClick={async () => {
                      setShowToast(true);
                      setToastMsg(`${item.name} remove from wishlist`);
                      dispatch({
                        type: "REMOVEFROMWISH",
                        payload: item
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                )}
              </div>
            </li>
          ))}
          <div class="cart-bottom">
            {cartLength === 0 ? (
              <h3>{""}</h3>
            ) : (
              <button class="btn secondary">Place Order</button>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}
