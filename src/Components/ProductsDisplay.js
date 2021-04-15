import { useContent } from "../Context";
import { useReducer } from "react";
import "./Component.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faHeart,
  faEye,
  faFilter,
  faSort
} from "@fortawesome/free-solid-svg-icons";
export function ViewButton() {
  let navigate = useNavigate();
  return (
    <button class="btn secondary" onClick={() => navigate("/cartitems")}>
      {" "}
      <FontAwesomeIcon icon={faEye} /> VIEW CART
    </button>
  );
}
export default function ProductsDisplay() {
  const { dispatch, setShowToast, setToastMsg, state } = useContent();

  const isProductinCart = (productid) =>
    state.cartItems.findIndex((item) => item.id === productid) === -1
      ? true
      : false;
  const isProductinWishlist = (productid) =>
    state.wishItems.findIndex((item) => item.id === productid) === -1
      ? true
      : false;

  const [
    { showInventoryAll, showFastDeliveryOnly, withinRange, sortBy },
    prodispatch
  ] = useReducer(reducer, {
    showInventoryAll: true,
    showFastDeliveryOnly: false,
    withinRange: 2500,
    sortBy: null
  });
  function getSortedData(productList, sortBy) {
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return productList.sort((a, b) => b["price"] - a["price"]);
    }
    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return productList.sort((a, b) => a["price"] - b["price"]);
    }
    return productList;
  }

  function getFilteredData(
    productList,

    { showFastDeliveryOnly, showInventoryAll, withinRange }
  ) {
    return productList
      .filter(({ price }) => price <= withinRange)
      .filter(({ fastDelivery }) =>
        showFastDeliveryOnly ? fastDelivery : true
      )
      .filter(({ inStock }) => (showInventoryAll ? true : inStock));
  }

  const sortedData = getSortedData(state.database, sortBy);
  const filteredData = getFilteredData(sortedData, {
    showFastDeliveryOnly,
    showInventoryAll,
    withinRange
  });
  return (
    <div class="mt">
      <div class="product-container">
        <fieldset class="listset">
          <legend>
            <FontAwesomeIcon icon={faSort} />
          </legend>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() =>
                prodispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
              }
              checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
            ></input>{" "}
            Price - High to Low
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={() =>
                prodispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
              }
              checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
            ></input>{" "}
            Price - Low to High
          </label>
        </fieldset>
        <fieldset class="listset">
          <legend>
            {" "}
            <FontAwesomeIcon icon={faFilter} />
          </legend>
          <label>
            <input
              type="checkbox"
              checked={showInventoryAll}
              onChange={() => prodispatch({ type: "TOGGLE_INVENTORY" })}
            />
            Include Out of Stock
          </label>

          <label>
            <input
              type="checkbox"
              checked={showFastDeliveryOnly}
              onChange={() => prodispatch({ type: "TOGGLE_DELIVERY" })}
            />
            Fast Delivery Only
          </label>
          <label style={{ display: "block", marginTop: "1rem" }}>
            Price Range
            <input
              type="range"
              min="1999"
              max="5000"
              id="slider"
              step="500"
              value={withinRange}
              onChange={(e) =>
                prodispatch({ type: "RANGE_CHANGE", payload: e.target.value })
              }
            />
            <span>{withinRange}</span>
          </label>
        </fieldset>
        <div class="container-cards">
          {filteredData.map((item) => (
            <div key={item.id} id="closecard" class="cards mt-small">
              <img class="image" src={item.image} alt={item.name} />
              <div class="cards-content">
                {isProductinWishlist(item.id) ? (
                  <button
                    class="cart-wish-before"
                    onClick={async () => {
                      setShowToast(true);
                      setToastMsg(`${item.name} added to wishlist`);
                      dispatch({ type: "PRODUCTTOWISH", payload: item.id });
                    }}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                ) : (
                  <button
                    class="cart-wish-after"
                    onClick={async () => {
                      setShowToast(true);
                      setToastMsg(`${item.name} removed from wishlist`);
                      dispatch({ type: "REMOVEFROMWISH", payload: item });
                    }}
                  >
                    <b>
                      <FontAwesomeIcon icon={faHeart} />
                    </b>
                  </button>
                )}
                <div class="product-heading">{item.name}</div>
                <div>
                  <b>INR {item.price}</b>
                </div>

                {item.inStock && <span class="prod-desc mb"> In Stock </span>}
                {!item.inStock && (
                  <span class="prod-desc mb"> Out of Stock </span>
                )}
                {item.fastDelivery ? (
                  <div class="prod-desc mb"> Fast Delivery </div>
                ) : (
                  <div class="prod-desc mb"> 3 days minimum </div>
                )}
                <span class="badge primary card-badge">SALE</span>
              </div>
              <div class="product-footer">
                {isProductinCart(item.id) ? (
                  <button
                    class="btn secondary"
                    onClick={async () => {
                      setShowToast(true);
                      setToastMsg(`${item.name} added to cart`);
                      dispatch({ type: "PRODUCTTOCART", payload: item.id });
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} /> ADD TO CART
                  </button>
                ) : (
                  <ViewButton />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_INVENTORY":
      return (state = {
        ...state,
        showInventoryAll: !state.showInventoryAll
      });

    case "TOGGLE_DELIVERY":
      return (state = {
        ...state,
        showFastDeliveryOnly: !state.showFastDeliveryOnly
      });
    case "SORT":
      return (state = {
        ...state,
        sortBy: action.payload
      });
    case "RANGE_CHANGE":
      return (state = { ...state, withinRange: action.payload });
    default:
      return state;
  }
}
