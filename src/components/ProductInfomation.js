import React, { useState } from "react";
import { productInfoTabs } from "../ultils/contants";

const activedStyles = "";
const notActivedStyles = "";

const ProductInfomation = () => {
  const [activedTab, setActivedTab] = useState(1);
  return (
    <div>
      <div className="flex items-center gap-2 relative bottom-[-2px]">
        {productInfoTabs.map((el) => (
          <span
            className={`p-2 px-4 cursor-pointer   ${
              activedTab === el.id
                ? "bg-white p-4 border-main  border-b-2 rounded-t-lg "
                : "bg-gray-200 "
            } `}
            key={el.id}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="w-full shadow-lg rounded-b-lg   p-4 ">
        {productInfoTabs.some((el) => el.id === activedTab) &&
          productInfoTabs.find((el) => el.id === activedTab)?.content}
      </div>
    </div>
  );
};

export default ProductInfomation;
