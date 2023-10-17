import React, { memo } from "react";
import { renderStarFromNumber, formatMoney } from "../../ultils/helpers";
const ProductCard = ({ price, totalRatings, title, image }) => {
  return (
    <div className="w-1/3  flex-auto mb-[20px]  px-[10px]">
      <div className="flex shadow-xl rounded-lg w-full">
        <img
          src={image}
          alt="products"
          className="p-4 w-[120px] object-contain"
        ></img>
        <div className=" flex flex-col gap-1 mt-[15px] items-start w-full text-xs">
          <span className=" line-clamp-1 capitalize text-sm">
            {title?.toLowerCase()}
          </span>
          <span className="flex h-4">
            {renderStarFromNumber(totalRatings, 14)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
          <span>{`${formatMoney(price)} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
