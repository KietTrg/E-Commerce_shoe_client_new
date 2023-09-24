import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../apis/product";
import Product from "./Product";
import Slider from "react-slick";
const tabs = [
  { id: 1, name: "best sellers" },
  { id: 2, name: "new arrivals" },
];
const settings = {
  dots: false, //dau cham
  infinite: false,
  speed: 500,
  slidesToShow: 3, //trong 1 lan show
  slidesToScroll: 1,
};
const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: "-sold" }),
      apiGetProducts({ sort: "-createdAt" }),
    ]);

    if (response[0]?.success) {
      setBestSeller(response[0].productDatas);
      setProducts(response[0].products);
    }
    if (response[1]?.success) setNewProducts(response[1].productDatas);
    setProducts(response[0].productDatas);

    // console.log({ bestSeller, newProducts });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (activedTab === 1) setProducts(bestSeller);
    if (activedTab === 2) setProducts(newProducts);
  }, [activedTab]);
  return (
    <div>
      <div className=" flex text-[20px] pb-4 border-b-2 border-main">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold capitalize px-8 border-r text-gray-400 cursor-pointer ${
              activedTab === el.id ? " text-gray-900" : ""
            }`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px]">
        <Slider {...settings}>
          {products?.map((el) => (
            <Product
              key={el.id}
              pid={el.id}
              productDatas={el}
              isNew={activedTab === 1 ? false : true}
            ></Product>
          ))}
        </Slider>
      </div>
      <div className="w-full flex gap-4 mt-4">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          className=" flex-1 object-contain"
        ></img>
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          className=" flex-1 object-contain"
        ></img>
      </div>
    </div>
  );
};

export default BestSeller;
