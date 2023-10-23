import React, { memo, useState } from "react";
import { formatMoney } from "ultils/helpers";
import label from "assets/New.png";
import Trending from "assets/Treding.png";
import { renderStarFromNumber } from "ultils/helpers";
import { SelectOption } from "..";
import icons from "ultils/icons";
import { Link } from "react-router-dom";
import path from "ultils/path";
import withBase from "hocs/withBase";

const { AiFillEye, BiMenu, BsSuitHeartFill } = icons;
const Product = ({ productDatas, isNew, normal, navigate }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  const handleClickOption = (e, flag) => {
    e.stopPropagation();
    if (flag === "MENU")
      navigate(
        `/${productDatas?.category?.toLowerCase()}/${productDatas?._id}/${
          productDatas?.title
        }`
      );
    if (flag === "WISHLIST") console.log("Wishlist");
    if (flag === "QUICK_VIEW") console.log("QUICK_VIEW");
  };
  return (
    <div className=" w-full text-base  px-[10px]">
      <div
        className="w-full mb-2 shadow-lg rounded-xl  p-[15px] flex flex-col items-start"
        onClick={(e) =>
          navigate(
            `/${productDatas?.category?.toLowerCase()}/${productDatas?._id}/${
              productDatas?.title
            }`
          )
        }
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full flex items-center justify-center relative">
          {isShowOption && (
            <div className=" absolute bottom-[-10px] flex justify-center left-0 right-0 gap-2 animate-slide-top ">
              <span onClick={(e) => handleClickOption(e, "QUICK_VIEW")}>
                <SelectOption icons={<AiFillEye />} />
              </span>
              <span onClick={(e) => handleClickOption(e, "MENU")}>
                <SelectOption icons={<BiMenu />} />
              </span>
              <span onClick={(e) => handleClickOption(e, "WISHLIST")}>
                <SelectOption icons={<BsSuitHeartFill />} />
              </span>
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
          {!normal && (
            <img
              src={isNew ? label : Trending}
              className={`absolute w-[100px] h-[35px] top-[0] right-[0] object-cover`}
              alt=""
            ></img>
          )}
        </div>
        <div className=" flex flex-col gap-1 mt-[15px] items-start w-full">
          <span className="flex h-4">
            {renderStarFromNumber(productDatas?.totalRatings)?.map(
              (el, index) => (
                <span key={index}>{el}</span>
              )
            )}
          </span>
          <span className=" line-clamp-1">{productDatas?.title}</span>
          <span>{`${formatMoney(productDatas?.price)} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default withBase(memo(Product));
