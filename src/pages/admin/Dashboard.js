import { apiGetUsers } from "apis";
import React, { useEffect, useState } from "react";
import { MdGroups2 } from "react-icons/md";

const Dashboard = () => {
  const [users, setUsers] = useState(null);
  const fetchUsers = async () => {
    const response = await apiGetUsers();
    if (response.success) setUsers(response);
  };
  useEffect(() => {
    fetchUsers();
  }, [users]);
  return (
    <div className="w-full ">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold p-4 border-b-2 border-main">
        <div className="flex items-center text-main justify-center gap-4 ">
          <span>Manage User </span>
        </div>
      </h1>

      <div className="p-4 flex items-center gap-4">
        <div className="flex-auto w-[300px] h-[150px] px-16 flex justify-between  items-center shadow-lg rounded-2xl border">
          <MdGroups2 color="#005f90" size={90}></MdGroups2>

          <div className="flex flex-col gap-2 items-center text-2xl">
            <span className="font-semibold text-main">Total User</span>
            <span className="font-semibold text-main">{users?.counts}</span>
          </div>
        </div>
        <div className="flex-auto w-[300px] h-[150px] shadow-lg rounded-2xl border">
          Total Product
        </div>
        <div className="flex-auto w-[300px] h-[150px] shadow-lg rounded-2xl border">
          Revenue
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
