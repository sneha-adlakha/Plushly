import { useContent } from "../Context";
import "./Component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faHeart,
  faEye,
  faMinusSquare
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
function WishButton() {
  let navigate = useNavigate();
  return (
    <button class="btn secondary" onClick={() => navigate("/cartitems")}>
      {" "}
      <FontAwesomeIcon icon={faEye} /> VIEW CART
    </button>
  );
}
export default function Wishlist() {
  return (
    <>
      <div class="mt">
        <div class="main mt">
          <WishDisplay />
        </div>
      </div>
    </>
  );
}

export const WishDisplay = () => {
  const { state, setShowToast, setToastMsg, dispatch } = useContent();
  const isProductinCart = (productid) =>
    state.cartItems.findIndex((item) => item.id === productid) === -1
      ? true
      : false;
  return (
    <>
      <div class="container-cards">
        {state.wishItems.map((item) => (
          <div key={item.id} id="closecard" class="cards mt-small">
            <img class="img" src={item.image} alt={item.name} />
            <div class="cards-content">
              <button
                class="cart-close-before"
                onClick={async () => {
                  setShowToast(true);
                  setToastMsg(`${item.name} removed from wishlist`);
                  dispatch({
                    type: "REMOVEFROMWISH",
                    payload: item
                  });
                }}
              >
                {" "}
                <FontAwesomeIcon icon={faMinusSquare} />
              </button>
              <div class="wish-heading">{item.name}</div>
              <div class="wish-desc">
                <b>INR {item.price}</b>
              </div>
            </div>
            <div class="product-footer">
              {isProductinCart(item.id) ? (
                <button
                  class="btn secondary"
                  onClick={() => {
                    dispatch({
                      type: "WISHTOCART",
                      payload: item
                    });
                  }}
                >
                  {" "}
                  <FontAwesomeIcon icon={faPlus} /> ADD TO CART
                </button>
              ) : (
                <WishButton />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
