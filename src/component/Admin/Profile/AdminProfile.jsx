import React from "react";
import { useSelector } from "react-redux";

function AdminProfile({ handleLogout }) {
  const res = useSelector((store) => store.adminLogin?.adminInfo?.admin);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-6 h-auto md:h-screen shadow-lg">

        {/* Left Section */}
        <div className="w-full md:w-2/3">
          <div className="flex flex-col gap-4 bg-white shadow-lg p-4 rounded-lg">
            <div
              style={{ background: "linear-gradient(60deg, #ab47bc, #8e24aa)" }}
              className="w-full h-16 flex items-center px-6 text-white font-semibold rounded-md"
            >
              <h4>Complete Profile</h4>
            </div>

            <div className="h-16 flex items-center justify-center shadow-lg rounded-md bg-gray-50">
              {res?.role}
            </div>
            <div className="h-16 flex items-center justify-center shadow-lg rounded-md bg-gray-50">
              {res?.email}
            </div>
            <div className="h-16 flex items-center justify-center shadow-lg rounded-md bg-gray-50">
              {res?.id}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="max-w-sm w-full rounded overflow-hidden shadow-lg bg-white">
            <div className="relative">
              <img
                className="w-full object-cover clippy"
                src="admin.png"
                alt="Admin Profile"
              />
            </div>
            <div className="pt-4 pb-6 px-5 flex flex-col items-center">
              <p className="font-bold mb-4 text-2xl md:text-3xl">ADMIN</p>
              <button
                onClick={handleLogout}
                type="button"
                className="text-white w-28 bg-purple-700 hover:bg-purple-800 
                focus:outline-none focus:ring-4 focus:ring-purple-300 
                font-medium rounded-full text-sm px-5 py-2.5 text-center 
                dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
