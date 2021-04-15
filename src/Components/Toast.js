import "./Toast.css";
import { useContent } from "../Context";
import { useEffect } from "react";
export const Toast = () => {
  const { showToast, setShowToast, toastMsg } = useContent();
  useEffect(() => {
    const toastTimeout = setTimeout(() => {
      setShowToast(false);
    }, 1000);
    return () => {
      clearTimeout(toastTimeout);
    };
  }, [showToast, setShowToast]);
  return (
    <>
      <div class="toast-container">
        <div class="toast-message">{toastMsg}</div>
        <button class="toast-close-before" onClick={() => setShowToast(false)}>
          {"X"}
        </button>
      </div>
    </>
  );
};
export default Toast;
