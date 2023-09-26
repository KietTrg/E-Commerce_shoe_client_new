import React from "react";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
}) => {
  return (
    <div className="w-full relative">
      {value.trim() !== "" && (
        <label
          htmlFor={nameKey}
          className=" block bg-white px-1 text-[12px] absolute top-0 left-[8px] animate-slide-top-sm"
        >
          {nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
        </label>
      )}
      <input
        type={type || "text"}
        name=""
        id=""
        className="px-4 py-2 rounded-sm w-full my-2 border-b border-gray-300 placeholder:text-sm outline-none"
        placeholder={nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
      ></input>
    </div>
  );
};

export default InputField;
