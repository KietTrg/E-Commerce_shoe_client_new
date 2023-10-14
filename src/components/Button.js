import React from "react";

const Button = ({ children, handleOnClick, style, fw }) => {
  return (
    <button
      type="button"
      className={
        style
          ? style
          : ` hover:bg-[#014e75] px-4 py-2 rounded-md text-white text-semibold bg-main my-2 ${
              fw ? "w-full" : "w-fit"
            }`
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      {children}
    </button>
  );
};

export default Button;
