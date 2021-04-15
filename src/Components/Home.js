import { categories } from "./Categories.js";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Component.css";
import Banners from "./Carousel.js";
export default function Home() {
  return (
    <>
      <div class="mt-carousel">
        <Banners />
        <div class="home-container">
          <div class="container-home">
            {categories.map((product) => (
              <div key={product.id} class="category-cards mt-small">
                <div class="imgoverlay">
                  <Link to="/products">
                    <div class="overlay-container">
                      <img src={product.cat_img} class="img" />
                      <div class="overlay overlaybottom">
                        {" "}
                        <img src={product.offer_img} class="img" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="txt-normal">Inspired from ONLY</div>
        <div class="footer-txt">Designed by Sneha Adlakha</div>
      </footer>
    </>
  );
}
