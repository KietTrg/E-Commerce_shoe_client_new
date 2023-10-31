import { Button, Product } from "components";
import React from "react";
import { useSelector } from "react-redux";

const Wishlist = () => {
  const { current } = useSelector((state) => state.user);
  return (
    <div className="w-full relative px-4">
      <header className="text-main text-3xl font-semibold py-4 border-b-2 border-main">
        My Wish List
      </header>
      <div className="p-4 w-full grid grid-cols-3">
        {current?.wishlist?.map((el) => (
          <div className="flex flex-col pt-3 gap-3" key={el._id}>
            <Product pid={el._id} productDatas={el}></Product>
            <div className="px-3">
              <Button>Add to cart</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
