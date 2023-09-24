import React, { useState, useEffect, memo } from "react";
import icons from "../ultils/icons";
import { apiGetProducts } from "../apis/product";
// import { renderStarFromNumber, formatMoney } from "../ultils/helpers";
const { AiFillStar } = icons;

const DealDaily = () => {
  const [dealDaily, setDealDaily] = useState(null);

  const fetchDealDaily = async () => {
    const response = await apiGetProducts({
      limit: 1,
      page: 5,
      //   totalRatings: 5,
    });
    if (response.success) setDealDaily(response.productDatas[0]);
  };

  useEffect(() => {
    fetchDealDaily();
  }, []);
  //   console.log(dealDaily);
  return (
    <div className=" border w-full flex-auto">
      <div className="flex justify-between items-center p-4 w-full">
        <span className=" flex-1 flex justify-center">
          <AiFillStar size={20} color="#005f90" />
        </span>
        <span className=" flex-8 font-semibold text-[20px] flex justify-center text-gray-700">
          DEAL DAILY
        </span>
        <span className=" flex-1"></span>
      </div>
      <div className=" w-full flex flex-col items-center pt-8 gap-2">
        <img
          src={
            dealDaily?.thumb ||
            "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
          }
          alt=""
          className=" w-full  object-contain"
        ></img>
        {/* <span className="flex h-4">
          {renderStarFromNumber(dealDaily?.totalRatings)}
        </span>
        <span className=" line-clamp-1">{dealDaily?.title}</span>
        <span>{`${formatMoney(dealDaily?.price)} VND`}</span> */}
      </div>
    </div>
  );
};

export default memo(DealDaily);
