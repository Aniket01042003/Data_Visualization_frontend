import React from "react";
import { CgUserList } from "react-icons/cg";
import { MdShowChart  } from "react-icons/md";
import { GiChart } from "react-icons/gi";
import { BiSolidEdit } from "react-icons/bi";

const SmallChart = ({setActiveItem}) => {

  const arr = [
    {
      icon: <CgUserList className="h-10 w-10 text-white"/>,
      color: 'linear-gradient(60deg, #ffa726, #fb8c00)',
      desc:'User Profile List',
      name: "User Profile List"
    }, 
    {
      icon: <GiChart className="h-10 w-10 text-white"/>,
      color: 'linear-gradient(60deg, #66bb6a, #43a047)',
      desc:'Chart List',
      name: "Chart List",
    },
    {
      icon: <BiSolidEdit className="h-10 w-10 text-white"/>,
      color: 'linear-gradient(60deg, #ef5350, #e53935)',
      desc:'Manual Data List',
      name: "Manual Data List"
    },
    {
      icon: <MdShowChart  className="h-10 w-10 text-white"/>,
      color: 'linear-gradient(60deg, #26c6da, #00acc1)',
      desc:'Graph List',
      name: "Graph List",
    },
  ]

  return (
    <div className="bg-[#eeeee] p-4">
      <div className="flex  flex-wrap justify-between ">
        {/* Service Card 1 */}
        {arr.map((item) => (
          <div onClick={()=>setActiveItem(item.name)} className="rounded-xl cursor-pointer w-[18rem] bg-white p-6 mt-8 shadow-xl">
            <div style={{ background: item.color }} className=" flex h-[6rem] w-[6rem] rounded-md -translate-y-12 transform items-center justify-center shadow-lg shadow-teal-500/40">
              {item.icon}
            </div>
            <h1 style={{font: '"Roboto", "Helvetica", "Arial", sans-serif'}} className="text-darken mb-3 text-lg font-medium ">
              {item.desc}
            </h1>
            <hr />
            <p className="px-4 text-gray-500">
              
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmallChart;
