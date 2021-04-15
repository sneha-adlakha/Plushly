import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
export default function Banners() {
  return (
    <>
      <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
        <div class="corousel-style">
          <img
            src="https://images.bestsellerclothing.in/catalog/brandstore/only/banner/ol_unique_webbanner_2321.png"
            alt="banner"
          />
        </div>
        <div class="corousel-style">
          <img
            src="https://images.bestsellerclothing.in/catalog/brandstore/veromoda/banner/vm_festive_webbanner_41021.jpg"
            alt="banner"
          />
        </div>
        <div class="corousel-style">
          <img
            src="https://images.bestsellerclothing.in/catalog/brandstore/only/banner/ol_flat20_webbanner_4321.png"
            alt="banner"
          />
        </div>
      </Carousel>
    </>
  );
}
