import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LineAdminChart from "./charty/LineAdminChart";
import BarAdminChart from "./charty/BarAdminChart";
import { fetchDatasets, fetchUsers } from "../../Redux/Admin/Action";
import Line2AdminChart from "./charty/Line2AdminChart.jsx";

const ChartCard = ({filesData}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const userData = useSelector((store) => store.users);
  const users = userData.users;

  // console.log("filesdata from CC", filesData);

  // Process user data for daily new logins
  const dailySignups = users.reduce((acc, user) => {
    if (user.createdAt) {
      const date = new Date(user.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {});

  const dailyChartData = {
    labels: Object.keys(dailySignups),
    datasets: [{
      label: "Daily New User Logins",
      data: Object.values(dailySignups),
      backgroundColor: "rgba(255, 165, 0, 0.6)",
      borderColor: "rgba(255, 140, 0, 1)",
      borderWidth: 1,
    }],
  };

  // Process filesData for daily dataset uploads
  const dailyDatasetUploads = filesData?.reduce((acc, file) => {
    if (file.createdAt) {
      const date = new Date(file.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {});

  const dailyDatasetChartData = {
    labels: Object.keys(dailyDatasetUploads || {}),
    datasets: [{
      label: "Daily Dataset Uploads",
      data: Object.values(dailyDatasetUploads || {}),
      backgroundColor: "rgba(102, 187, 106, 0.6)",
      borderColor: "rgba(67, 160, 71, 1)",
      borderWidth: 1,
    }],
  };

  // console.log("Daily Dataset Uploads Chart Data: ", dailyDatasetChartData);
  // console.log("Daily User Signups Chart Data: ", dailyChartData);

  return (
    <div className="h-full min-h-screen w-full bg-[#eeeee]pt-12 mt-20 p-4">
      <div className="grid gap-14 md:grid-cols-2 md:gap-5">
        {/* Daily Dataset Uploads */}
        <div className="rounded-xl bg-white p-6 shadow-xl">
          <div style={{ background: 'linear-gradient(60deg, #66bb6a, #43a047)' }} className="mx-auto flex h-56 rounded-md -translate-y-12 transform items-center justify-center shadow-lg ">
            <LineAdminChart chartData={dailyDatasetChartData} />
          </div>
          <div className="flex flex-col justify-center items-center" >
            <h1 className="text-darken mb-3 text-xl lg:px-14">Daily Dataset Uploads</h1>
            <p className="px-4 text-gray-500">Tracking daily dataset uploads.</p>
          </div>
        </div>

        {/* Daily New User Logins */}
        <div className="rounded-xl bg-white p-6 shadow-xl">
          <div style={{ background: 'linear-gradient(60deg, #ffa726, #fb8c00)' }} className="mx-auto flex h-56 rounded-md -translate-y-12 transform items-center justify-center bg-teal-400 shadow-lg ">
            <BarAdminChart chartData={dailyChartData} />
          </div>
          <div className="flex flex-col justify-center items-center" >
            <h1 className="text-darken mb-3 text-xl lg:px-14">Daily New User Logins</h1>
            <p className="px-4 text-gray-500">Monitor new user signups on a daily basis.</p>
          </div>
        </div>
      </div>
        {/* Yearly New User Logins */}
        <div className="rounded-xl bg-white p-6 mt-20 shadow-xl">
          <div style={{ background: 'linear-gradient(60deg, #ef5350, #e53935)' }} className="mx-auto flex h-56 rounded-md -translate-y-12 transform items-center justify-center bg-teal-400 shadow-lg ">
            <Line2AdminChart />
          </div>
          <div className="flex flex-col justify-center items-center" >
            <h1 className="text-darken mb-3 text-xl lg:px-14">Yearly New User Logins</h1>
            <p className="px-4 text-gray-500">Monitor yearly user growth trends.</p>
          </div>
        </div>
    </div>
  );
};

export default ChartCard;
