import { ContentContext } from "./ContentContext";
import { database } from "./DataBase.js";
import { useState, useReducer } from "react";
import { reducerhandler } from "./ReducerHandler";

export const ContentProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const [state, dispatch] = useReducer(reducerhandler, {
    database,
    cartItems: [],
    wishItems: []
  });

  return (
    <ContentContext.Provider
      value={{
        state,
        showToast,
        setShowToast,
        toastMsg,
        setToastMsg,
        dispatch
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};
