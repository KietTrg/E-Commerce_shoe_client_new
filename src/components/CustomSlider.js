import React from "react";
import Slider from "react-slick";
import { Product } from "./";
const settings = {
  dots: false, //dau cham
  infinite: false,
  speed: 500,
  slidesToShow: 3, //trong 1 lan show
  slidesToScroll: 1,
};
const CustomSlider = ({ products, activedTab }) => {
  return (
    <>
      {products && (
        <Slider {...settings}>
          {products?.map((el, index) => (
            <Product
              key={index}
              pid={el.id}
              productDatas={el}
              isNew={activedTab === 1 ? false : true}
            ></Product>
          ))}
        </Slider>
      )}
    </>
  );
};

export default CustomSlider;
