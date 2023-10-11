import React, { useEffect, useState } from "react";
import icons from "../ultils/icons";
import { colors } from "../ultils/contants";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { apiGetProducts } from "../apis";

const { AiOutlineDown } = icons;
const SearchItem = ({
  name,
  activeClick,
  ChangeActiveFilter,
  type = "checkbox",
}) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [selected, setSetselected] = useState([]);
  const [price, setPrice] = useState({
    from: 0,
    to: 0,
  });
  const [bestPrice, setBestPrice] = useState(null);
  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl)
      setSetselected((prev) => prev.filter((el) => el !== e.target.value));
    else setSetselected((prev) => [...prev, e.target.value]);
    ChangeActiveFilter(null);
  };
  const fetchBestPriceProduct = async () => {
    const response = await apiGetProducts({ sort: "-price", limit: 1 });
    if (response.success) setBestPrice(response.productDatas[0]?.price);
  };
  useEffect(() => {
    if (selected.length > 0) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          color: selected.join(","),
        }).toString(),
      });
    } else {
      navigate(`/${category}`);
    }
  }, [selected]);
  useEffect(() => {
    if (type === "input") fetchBestPriceProduct();
  }, [type]);
  useEffect(() => {
    const data = {};
    if (Number(price.from) > 0) data.from = price.from;
    if (Number(price.to) > 0) data.to = price.to;

    navigate({
      pathname: `/${category}`,
      search: createSearchParams(data).toString(),
    });

    console.log(price);
  }, [price]);
  // console.log(selected);
  return (
    <div
      className=" cursor-pointer relative text-sm gap-6 p-2 rounded-xl border border-main flex justify-between items-center"
      onClick={() => ChangeActiveFilter(name)}
    >
      <span className=" capitalize">{name}</span>
      <AiOutlineDown></AiOutlineDown>
      {activeClick === name && (
        <div className=" z-10 absolute top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white min-w-[150px]">
          {type === "checkbox" && (
            <div className="">
              <div className="p-4 flex justify-between items-center gap-8 border-b">
                <span className=" whitespace-nowrap">{`${selected.length} selected`}</span>
                <span
                  className=" cursor-pointer underline hover:text-main"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSetselected([]);
                  }}
                >
                  Reset
                </span>
              </div>
              <div
                className="flex flex-col gap-3 mt-4"
                onClick={(e) => e.stopPropagation()}
              >
                {colors.map((el, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-main bg-gray-100 rounded border-gray-300 focus-within:hidden"
                      value={el}
                      onChange={handleSelect}
                      id={el}
                      checked={selected.some(
                        (selectedItem) => selectedItem === el
                      )}
                    ></input>
                    <label className=" capitalize text-gray-700" htmlFor={el}>
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === "input" && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className="p-4 flex justify-between items-center gap-8 border-b">
                <span className=" whitespace-nowrap">{`Gia cao nhat la ${Number(
                  bestPrice
                ).toLocaleString()} VND`}</span>
                <span
                  className=" cursor-pointer underline hover:text-main"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSetselected([]);
                  }}
                >
                  Reset
                </span>
              </div>
              <div className="flex items-center p-2 gap-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="from">From</label>
                  <input
                    value={price.from}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, from: e.target.value }))
                    }
                    type="number"
                    id="from"
                    className="form-input"
                  ></input>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="to">To</label>
                  <input
                    value={price.to}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, to: e.target.value }))
                    }
                    type="number"
                    id="to"
                    className="form-input"
                  ></input>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchItem;
