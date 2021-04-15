export const reducerhandler = (state, action) => {
  switch (action.type) {
    case "PRODUCTTOCART":
      return {
        ...state,
        cartItems: addtocart({
          prodid: action.payload,
          productslist: state.database,
          cartdata: state.cartItems
        })
      };
    case "PRODUCTTOWISH":
      return {
        ...state,
        wishItems: prodtowish({
          prodid: action.payload,
          productslist: state.database,
          wishdata: state.wishItems
        })
      };
    case "REMOVEFROMCART":
      return {
        ...state,
        cartItems: removefromcart({
          prodid: action.payload.id,
          cartdata: state.cartItems
        })
      };
    case "CARTTOWISH":
      return {
        ...state,
        wishItems: updatewish({
          prodid: action.payload.id,
          wishdata: state.wishItems,
          productslist: state.database
        })
      };
    case "REMOVEFROMWISH": {
      return {
        ...state,
        wishItems: removefromwish({
          prodid: action.payload.id,
          wishdata: state.wishItems
        })
      };
    }
    case "WISHTOCART": {
      return {
        ...state,
        cartItems: addtocart({
          prodid: action.payload.id,
          productslist: state.database,
          cartdata: state.cartItems
        })
      };
    }
    case "INCREASEQTY": {
      return {
        ...state,
        cartItems: cartqtyincrease({
          prodid: action.payload.id,
          cartdata: state.cartItems
        })
      };
    }
    case "DECREASEQTY": {
      return {
        ...state,
        cartItems: cartqtydecrease({
          prodid: action.payload.id,
          cartdata: state.cartItems
        })
      };
    }
    default:
      return state;
  }
};

function addtocart({ prodid, productslist, cartdata }) {
  const isItemPresent = cartdata.findIndex((data) => data.id === prodid);
  const productId = productslist.findIndex((item) => item.id === prodid);
  if (isItemPresent === -1) {
    return [...cartdata, { ...productslist[productId], qty: 1 }];
  }
}

function prodtowish({ prodid, productslist, wishdata }) {
  const isItemPresent = wishdata.findIndex((item) => item.id === prodid);
  const productid = productslist.findIndex((item) => item.id === prodid);
  if (isItemPresent === -1) {
    return [...wishdata, { ...productslist[productid], qty: 1 }];
  }
}

function removefromcart({ prodid, cartdata }) {
  let newarr = [...cartdata];
  let findIndexValue = newarr.findIndex((item) => item.id === prodid);
  newarr[findIndexValue].qty = 0;
  return newarr.filter((item) => item.qty > 0);
}
function removefromwish({ prodid, wishdata }) {
  let newarr = [...wishdata];
  let findIndexValue = newarr.findIndex((item) => item.id === prodid);
  newarr[findIndexValue].qty = 0;
  return newarr.filter((item) => item.qty > 0);
}
function updatewish({ prodid, wishdata, productslist }) {
  let isIteminWish = wishdata.findIndex((item) => item.id === prodid);
  let findIndexValue = productslist.findIndex((item) => item.id === prodid);
  if (isIteminWish === -1) {
    return [...wishdata, { ...productslist[findIndexValue], qty: 1 }];
  }
  let newarr = wishdata.map((item) =>
    item.id === prodid ? { ...item, qty: item.qty + 1 } : { ...item }
  );
  return newarr.filter((item) => item.qty > 0);
}

function cartqtyincrease({ prodid, cartdata }) {
  return cartdata.map((item) =>
    item.id === prodid ? { ...item, qty: item.qty + 1 } : { ...item }
  );
}

function cartqtydecrease({ prodid, cartdata }) {
  return cartdata.map((item) =>
    item.id === prodid
      ? { ...item, qty: item.qty > 0 ? item.qty - 1 : 0 }
      : { ...item }
  );
}
