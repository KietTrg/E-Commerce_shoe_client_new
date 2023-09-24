import React, { useState } from "react";
import { formatMoney } from "../ultils/helpers";
import label from "../assets/New.png";
import Trending from "../assets/Treding.png";
import { renderStarFromNumber } from "../ultils/helpers";
import { SelectOption } from "./";
import icons from "../ultils/icons";
const { AiFillEye, BiMenu, BsSuitHeartFill } = icons;
const Product = ({ productDatas, isNew }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  return (
    <div className=" w-full text-base  px-[10px]">
      <div
        className="w-full mb-2 shadow-lg rounded-xl  p-[15px] flex flex-col items-start"
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className=" absolute bottom-[-10px] flex justify-center left-0 right-0 gap-2 animate-slide-top ">
              <SelectOption icons={<AiFillEye />} />
              <SelectOption icons={<BiMenu />} />
              <SelectOption icons={<BsSuitHeartFill />} />
            </div>
          )}

          <img
            src={
              productDatas?.thumb ||
              "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
            }
            alt=""
            className=" w-[274px] h-[274px] object-cover"
          ></img>
          <img
            src={isNew ? label : Trending}
            className={`absolute w-[100px] h-[35px] top-[0] right-[0] object-cover`}
            alt=""
          ></img>
        </div>
        <div className=" flex flex-col gap-1 mt-[15px] items-start w-full">
          <span className="flex h-4">
            {renderStarFromNumber(productDatas?.totalRatings)}
          </span>
          <span className=" line-clamp-1">{productDatas?.title}</span>
          <span>{`${formatMoney(productDatas?.price)} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
