import React, { useState, useCallback } from "react";
import { productInfoTabs } from "../ultils/contants";
import { Votebar, Button, VoteOption } from "./";
import { renderStarFromNumber } from "../ultils/helpers";
import { apiRatings } from "../apis";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../store/app/appSlice";
import Swal from "sweetalert2";
import path from "../ultils/path";
import { useNavigate } from "react-router-dom";
// const activedStyles = "";
// const notActivedStyles = "";

const ProductInfomation = ({
  totalRatings,
  ratings,
  nameProduct,
  pid,
  rerender,
}) => {
  const [activedTab, setActivedTab] = useState(1);
  // const [isVote, setIsVote] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  // const [payload, setPayload] = useState({
  //   comment: "",
  //   score: "",
  // });
  const handleSubmitVoteOption = async ({ comment, score }) => {
    if (!comment || !pid || !score) {
      alert("Please vote when click submit");
      return;
    }
    await apiRatings({ star: score, comment, pid });
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    rerender();
  };
  const handleVoteNow = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: "Login to vote",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Go login",
        title: "Opps!",
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOption
              nameProduct={nameProduct}
              handleSubmitVoteOption={handleSubmitVoteOption}
            ></VoteOption>
          ),
        })
      );
    }
  };
  return (
    <div>
      <div className="flex  items-center gap-2 relative bottom-[0px]">
        {productInfoTabs.map((el) => (
          <span
            className={`p-2 px-4 cursor-pointer   ${
              activedTab === +el.id
                ? "bg-white p-2 shadow-custom rounded-t-lg border-main  border-b-2 "
                : "bg-gray-200 "
            } `}
            key={el.id}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
        <div
          className={`p-2 px-4 cursor-pointer   ${
            activedTab === 5
              ? "bg-white p-2 shadow-custom rounded-t-lg border-main  border-b-2 "
              : "bg-gray-200 "
          } `}
          onClick={() => setActivedTab(5)}
        >
          CUSTOMER REVIEW
        </div>
      </div>
      <div className="w-full shadow-custom rounded-b-lg   p-4 ">
        {productInfoTabs.some((el) => el.id === activedTab) &&
          productInfoTabs.find((el) => el.id === activedTab)?.content}
        {activedTab === 5 && (
          <div className="flex flex-col p-4">
            <div className=" flex">
              <div className="flex-4 flex flex-col gap-2 items-center justify-center border-r-2 border-main">
                <span className=" font-semibold text-3xl">{`${totalRatings}/5`}</span>
                <span className="flex items-center gap-1">
                  {renderStarFromNumber(totalRatings)?.map((el, index) => (
                    <span key={index}>{el}</span>
                  ))}
                </span>
                <span className="text-sm">{`${ratings?.length} reviewer and commentors`}</span>
              </div>
              <div className="flex-6 gap-2 flex flex-col p-4">
                {Array.from(Array(5).keys())
                  .reverse()
                  .map((el) => (
                    <Votebar
                      key={el}
                      number={el + 1}
                      ratingTotal={ratings?.length}
                      ratingCount={
                        ratings?.filter((i) => i.star === el + 1)?.length
                      }
                    ></Votebar>
                  ))}
              </div>
            </div>
            <div className=" flex p-4 items-center justify-center flex-col gap-2 text-sm">
              <span>Do you review this product?</span>
              <Button handleOnClick={handleVoteNow}>Vote Now</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfomation;
