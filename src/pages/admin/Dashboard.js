import { apiGetProducts, apiGetUsers } from "apis";
import React, { useEffect, useState } from "react";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { MdGroups2 } from "react-icons/md";

const Dashboard = () => {
  const [users, setUsers] = useState(null);
  const [products, setProducts] = useState(null);
  const [dealDaily, setDealDaily] = useState(null);

  const fetchUsers = async (queries) => {
    const response = await apiGetUsers({ ...queries });
    if (response.success) setUsers(response);
  };
  const fetchProducts = async (queries) => {
    const response = await apiGetProducts({ ...queries });
    if (response.success) setProducts(response);

    console.log("response: ", response);
  };

  const fetchDealDaily = async () => {
    const response = await apiGetProducts({
      limit: 1,
      sort: "-sold",
    });
    if (response.success) setDealDaily(response.productDatas[0]);
  };
  useEffect(() => {
    fetchDealDaily();
  }, []);
  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);
  return (
    <div className="w-full ">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold p-4 border-b-2 border-main">
        <div className="flex items-center text-main justify-center gap-4 ">
          <span>Manage User </span>
        </div>
      </h1>

      <div className="p-4 flex items-center gap-4">
        <div className="flex-auto w-[300px] h-[150px] px-10 flex justify-between  items-center shadow-lg rounded-2xl border">
          <div className="flex items-center justify-center">
            <div className=" bg-[#9AD0EC] w-[80px] h-[80px] rounded-full relative "></div>
            <MdGroups2
              color="#005f90"
              className="absolute"
              size={50}
            ></MdGroups2>
          </div>

          <div className="flex flex-col gap-2 items-center text-2xl">
            <span className="font-semibold text-main">Total User</span>
            <span className="font-semibold text-main">{users?.counts}</span>
          </div>
        </div>
        <div className="flex-auto w-[300px] h-[150px] px-10 flex justify-between  items-center shadow-lg rounded-2xl border">
          <div className="flex items-center justify-center">
            <div className=" bg-[#9AD0EC] w-[80px] h-[80px] rounded-full relative "></div>
            <HiSquare3Stack3D
              color="#005f90"
              className="absolute"
              size={50}
            ></HiSquare3Stack3D>
          </div>

          <div className="flex flex-col gap-2 items-center text-2xl">
            <span className="font-semibold text-main">Total Product</span>
            <span className="font-semibold text-main">{products?.counts}</span>
            <span className="font-semibold text-main"></span>
          </div>
        </div>
        <div className="flex-auto w-[300px] h-[150px] shadow-lg rounded-2xl border">
          {dealDaily?.title}
        </div>
      </div>
      <div className=" flex gap-4 p-4">
        <div className=" flex-1">chart</div>
        <div className=" flex-1"></div>
        <div className="flex-1 rounded-2xl shadow-lg h-[430px]">
          <span className="font-semibold text-[20px] flex justify-center text-main">
            BEST SELLER PRODUCT
          </span>
          <div className=" w-full flex flex-col items-center gap-1 px-4">
            <img
              src={
                dealDaily?.thumb ||
                "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
              }
              alt=""
              className=" w-[330px] h-[330px]  object-cover"
            ></img>
            <span className="font-semibold text-[20px] flex justify-center text-gray-700">
              {dealDaily?.title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
