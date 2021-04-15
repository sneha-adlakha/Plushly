import { useContent } from "../Context";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHamburger,
  faHeart,
  faHome,
  faSearchPlus
} from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const {
    state: { wishItems, cartItems }
  } = useContent();
  return (
    <nav className="navContainer fixtop">
      <Link to="/" class="link-style">
        <div className=" nav-left">
          <div class="badge-icon-container">
            <div class="badge-icon">
              <FontAwesomeIcon icon={faHamburger} />
            </div>
          </div>
          <div className="badge-icon-container">
            <div class="badge-icon">
              <div> PLUSHLY</div>
            </div>
          </div>
        </div>
      </Link>
      <div className="nav-right">
        <Link to="products" class="link-style">
          <div class="badge-icon-container">
            <div className="badge-icon">
              <FontAwesomeIcon icon={faSearchPlus} />
            </div>
          </div>
        </Link>
        <Link to="wishlist" class="link-style">
          <div class="badge-icon-container">
            <div className="badge-icon">
              <FontAwesomeIcon icon={faHeart} />
              <span class="badge-i">{wishItems.length}</span>
            </div>
          </div>
        </Link>
        <Link to="cartItems" class="link-style">
          <div class="badge-icon-container">
            <div className="badge-icon">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="badge-i">{cartItems.length}</span>
            </div>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export const Navigation = () => {
  return <NavBar />;
};
