import "./styles.css";
import { useContent } from "./Context";
import { Navigation } from "./Components/Navigation.js";
import { Toast } from "./Components/Toast.js";
import "./Components/Navigation.css";
import { RouteProvider } from "./Routes";
export default function App() {
  const { showToast } = useContent();
  return (
    <div>
      <Navigation />
      <RouteProvider />
      {showToast ? <Toast /> : <></>}
    </div>
  );
}
