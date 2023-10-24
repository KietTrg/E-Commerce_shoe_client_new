import React, { memo, useEffect, useState } from "react";
import { apiGetProducts } from "../../apis/product";
import { Product, CustomSlider } from "..";
import { getNewProducts } from "../../store/products/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
const tabs = [
  { id: 1, name: "best sellers" },
  { id: 2, name: "new arrivals" },
];

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState(null);
  const [newProductss, setNewProducts] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
  const [products, setProducts] = useState(null);

  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.products);
  const { isShowModal } = useSelector((state) => state.app);
  const fetchProducts = async () => {
    const response = await apiGetProducts({ sort: "-sold" });

    if (response.success) {
      setBestSeller(response.productDatas);
      setProducts(response.products);
    }
    if (response.success) setNewProducts(response.productDatas);
    setProducts(response.productDatas);
  };
  useEffect(() => {
    fetchProducts();
    dispatch(getNewProducts());
  }, []);
  useEffect(() => {
    if (activedTab === 1) setProducts(bestSeller);
    if (activedTab === 2) setProducts(newProducts);
  }, [activedTab]);
  return (
    <div className={clsx(isShowModal ? "hidden" : "block")}>
      <div className=" flex text-[20px] ml-[-32px]">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold uppercase px-8 border-r text-gray-400 cursor-pointer ${
              activedTab === el.id ? " text-gray-900" : ""
            }`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px] border-t-2 border-main pt-4">
        <CustomSlider products={products} activedTab={activedTab} />
      </div>
      <div className="w-full flex gap-4 mt-4">
        <img
          src="https://lh3.google.com/u/0/d/16PuMmkukQms9L4Bs5nYXETwmzbnoByor=w1920-h883-iv1"
          className=" flex-1 object-contain"
        ></img>
        <img
          src="https://lh3.google.com/u/0/d/1_08_s3odPhHFQPqB2ucr1vk1mXzz8nNC=w1173-h883-iv1"
          className=" flex-1 object-contain"
        ></img>
      </div>
    </div>
  );
};

export default memo(BestSeller);
