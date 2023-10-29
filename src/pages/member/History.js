import { apiGetOrders, apiGetUserOrders } from "apis";
import { CustomSelect, InputForm, Pagination } from "components";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { formatMoney } from "ultils/helpers";
import { statusOders } from "ultils/contants";
import withBase from "hocs/withBase";

const History = ({ navigate, location }) => {
  const [orders, setOrders] = useState(null);
  const [counts, setCounts] = useState(0);
  const [params] = useSearchParams();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const q = watch("q");
  const status = watch("status");
  const fetchOrders = async (params) => {
    const response = await apiGetUserOrders({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) {
      console.log("response.success: ", response.success);
      setOrders(response.order);
      setCounts(response.counts);
    }

    // if (response.success) {
    //   setCounts(response.counts);

    //   setProducts(response.productDatas);
    // }
  };
  useEffect(() => {
    const pr = Object.fromEntries([...params]);
    fetchOrders(pr);
  }, [params]);
  console.log("status: ", status);

  const handleSearchStatus = ({ value }) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ status: value }).toString(),
    });
  };
  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-semibold py-4 border-b-2 border-main">
        History
      </header>
      <div className="flex justify-end items-center px-4 ">
        <form className="w-[45%] grid grid-cols-2 gap-4-">
          <div className=" col-span-1">
            <InputForm
              id="q"
              register={register}
              errors={errors}
              fullWidth
              placeholder="Search orders by status..."
            />
          </div>
          <div className="col-span-1 ">
            <CustomSelect
              options={statusOders}
              value={status}
              onChange={(val) => handleSearchStatus(val)}
              wrapClassname="w-full"
            />
          </div>
        </form>
      </div>
      <div className="w-full px-4 ">
        <table className="table-auto w-full ">
          <thead>
            <tr className="bg-blue-100 text-black  ">
              <th className="text-center py-2 rounded-l-lg">#</th>
              <th className="text-center py-2">Product</th>
              <th className="text-center py-2">Total</th>
              <th className="text-center py-2">Status</th>
              <th className="text-center py-2 ">created dAt</th>
              <th className="text-center py-2 rounded-r-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((el, index) => (
              <tr className="border-b border-main " key={el._id}>
                <td className="text-center py-2">
                  {+params.get("page") - 1 > 1
                    ? +params.get("page") - 1
                    : 0 * process.env.REACT_APP_LIMIT + index + 1}
                </td>
                <td className=" text-center py-2">
                  <span className="flex flex-col gap-2 ">
                    {el.products?.map((el) => (
                      <span key={el._id}>{el.title}</span>
                    ))}
                  </span>
                </td>
                <td className="text-center py-2">
                  {formatMoney(el.total * 23500) + " VND"}
                </td>
                <td className="text-center py-2">{el.status}</td>
                <td className="text-center py-2">
                  {moment(el.createdAt).format("DD/MM/YYYY")}
                </td>
                {/*                
                <td className="text-center py-2">
                  {moment(el.updatedAt).format("DD/MM/YYYY")}
                </td> */}
                <td>
                  {/* <div className="flex items-center justify-center">
                    <span
                      onClick={() => seteditProduct(el)}
                      className="text-main hover:text-orange-600 cursor-pointer px-1 "
                    >
                      <TbEdit size={20}></TbEdit>
                    </span>
                    <span
                      onClick={() => handleDeleteProduct(el._id)}
                      className="text-main hover:text-orange-600 cursor-pointer px-1"
                    >
                      <RiDeleteBin2Fill size={20}></RiDeleteBin2Fill>
                    </span>
                    <span
                      onClick={() => setCumtomizeVarriant(el)}
                      className="text-main hover:text-orange-600 cursor-pointer px-1"
                    >
                      <BiCustomize size={20}></BiCustomize>
                    </span>
                  </div> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end my-8 px-4">
        <Pagination totalCount={counts}></Pagination>
      </div>
    </div>
  );
};

export default withBase(History);
