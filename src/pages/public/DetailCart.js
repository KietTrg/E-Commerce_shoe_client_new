import { Breadcrumb, Button } from "components";
import OrderItem from "components/Products/OrderItem";
import withBase from "hocs/withBase";
import React from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "ultils/helpers";

const DetailCart = ({ location }) => {
  const { currentCart } = useSelector((state) => state.user);

  return (
    <div className="w-full">
      <div className="h-[81px] flex  justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase mb-2">My Cart</h3>
          <Breadcrumb category={location?.pathmane}></Breadcrumb>
        </div>
      </div>
      <div className="flex flex-col rounded-lg w-main mx-auto my-8 shadow-lg ">
        <div className="bg-[#9AD0EC] rounded-tr-lg rounded-tl-lg w-main grid mx-auto py-3 font-bold grid-cols-10">
          <span className="text-center  col-span-6 w-full">Products</span>
          <span className="text-center col-span-1 w-full">Quantity</span>
          <span className="text-center  col-span-3 w-full">Price</span>
        </div>
        {currentCart?.map((el) => (
          <OrderItem key={el._id} el={el} defaultQuantity={el.quantity} />
        ))}
      </div>
      <div className="w-main mx-auto mb-12 flex justify-center flex-col items-end gap-3">
        <span className="flex items-center gap-8 text-sm">
          <span>Subtotal:</span>
          <span className="text-main font-bold">{`${formatMoney(
            currentCart?.reduce((sum, el) => +el?.price * el?.quantity + sum, 0)
          )}vnd`}</span>
        </span>
        <span className="text-xs italic">dfdjfjsfkdsfkjhehihfw</span>
        <Button>Checkout</Button>
      </div>
    </div>
  );
};

export default withBase(DetailCart);
