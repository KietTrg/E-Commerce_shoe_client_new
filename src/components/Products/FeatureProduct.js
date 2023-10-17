import React, { memo, useEffect, useState } from "react";
import { ProductCard } from "..";
import { apiGetProducts } from "../../apis";

const FeatureProduct = () => {
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    const response = await apiGetProducts({ limit: 9, totalRatings: 5 });
    console.log(response);
    if (response.success) setProducts(response.productDatas);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className=" w-full">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        FEATURED PRODUCTS
      </h3>
      <div className=" flex flex-wrap mt-[15px] mx-[-10px]">
        {products?.map((el) => (
          <ProductCard
            key={el._id}
            image={el.thumb}
            title={el.title}
            totalRatings={el.totalRatings}
            price={el.price}
          />
        ))}
      </div>
      <div className=" flex justify-between">
        <img
          src="//digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
          alt="banner"
          className="w-[50%] object-contain"
        ></img>
        <div className="flex flex-col gap-4 justify-between w-[24%] ">
          <img
            src="//digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
            alt="banner"
          ></img>
          <img
            src="//digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
            alt="banner"
          ></img>
        </div>
        <img
          src="//digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
          alt="banner"
          className="w-[24%] object-contain"
        ></img>
      </div>
    </div>
  );
};

export default memo(FeatureProduct);
