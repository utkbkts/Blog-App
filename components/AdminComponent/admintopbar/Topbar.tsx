import useTotalNewUser from "@/hooks/useTotalNewUser";
import React from "react";

const Topbar = () => {
  const { totalNewUser } = useTotalNewUser();
  console.log(totalNewUser);

  return (
    <div className="flex flex-col gap-4 overflow-y-auto h-[70vh]">
      <h1>New Users</h1>
      {totalNewUser?.map((item:any) => (
        <div className="flex gap-2">
          <div className="w-12 h-12">
            <img
              src={item.image}
              className="border border-gray-500 rounded-full w-12 h-12"
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <span>{item.name}</span>
            <span>{item.email}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Topbar;
