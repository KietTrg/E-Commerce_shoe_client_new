import React from "react";

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
  return (
    <div className=" cursor-pointer flex items-center">
      <span
        onClick={() => handleChangeQuantity("minus")}
        className=" p-2 border-r border-main"
      >
        -
      </span>
      <input
        value={quantity}
        onChange={(e) => handleQuantity(e.target.value)}
        className="py-2 text-center outline-none w-[50px]"
        type="text"
      ></input>
      <span
        onClick={() => handleChangeQuantity("plus")}
        className=" cursor-pointer p-2 border-l border-main"
      >
        +
      </span>
    </div>
  );
};
export default SelectQuantity;
