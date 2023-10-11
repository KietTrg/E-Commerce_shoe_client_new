import React, { useState } from "react";
import { productInfoTabs } from "../ultils/contants";

const activedStyles = "";
const notActivedStyles = "";

const ProductInfomation = () => {
  const [activedTab, setActivedTab] = useState(1);
  return (
    <div>
      <div className="flex items-center gap-2 relative bottom-[0px]">
        {productInfoTabs.map((el) => (
          <span
            className={`p-2 px-4 cursor-pointer   ${
              activedTab === el.id
                ? "bg-white p-2 shadow-custom rounded-t-lg border-main  border-b-2 "
                : "bg-gray-200 "
            } `}
            key={el.id}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="w-full shadow-custom rounded-b-lg   p-4 ">
        {productInfoTabs.some((el) => el.id === activedTab) &&
          productInfoTabs.find((el) => el.id === activedTab)?.content}
      </div>
    </div>
  );
};

export default ProductInfomation;
