import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../Redux/Auth/Action";
import { useNavigate } from "react-router-dom";
import UpdateProfile from "./UpdateProfile.jsx";
import { deleteDataset, fetchDatasets } from "../../Redux/Dataset/Action";
import { RiDeleteBin6Line } from "react-icons/ri";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((store) => store.auth.user);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(fetchDatasets());
    }
  }, [dispatch, jwt]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.setItem("jwt", " ");
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };
  const handleShowClick = (id) => {
    navigate(`/2dchart/${id}`);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteDataset(id));
  };
  const { datasets } = useSelector((state) => state.datasetReducer);



  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-black/40 backdrop-blur-md rounded-3xl shadow-[0_0_30px_#00acc1] p-6 flex flex-col md:flex-row items-center md:items-start gap-10 transition-all duration-300">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full flex items-center justify-center bg-[#00acc1] text-black text-5xl font-bold shadow-inner">
          {user?.name?.[0]}
        </div>

        {/* Info */}
        <div className="flex flex-col text-center md:text-left w-full">
          <h1 className="text-5xl font-semibold text-[#00acc1]">{user?.name}</h1>
          <p className="text-xl text-gray-300 mt-1">{user?.email}</p>
          <p className="text-xl text-gray-300 mt-1">{user?.phno}</p>



          {/* Buttons */}
          <div className="flex gap-4 mt-6 justify-center md:justify-start">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold py-2 px-6 rounded-full transition-all shadow-md hover:scale-105"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-6 rounded-full transition-all shadow-md hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {isEditing && (
        <UpdateProfile
          user={user}
          jwt={jwt}
          onClose={() => setIsEditing(false)}
        />
      )}
      <div className="mt-12 w-full max-w-4xl mx-auto p-6 bg-black/40 backdrop-blur-md rounded-2xl shadow-[0_0_20px_#00acc1]">
        <h3 className="text-xl font-semibold text-[#00acc1] mb-4">Your Files</h3>
        {datasets && datasets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="text-xs uppercase bg-[#00acc1]/20 text-[#00acc1]">
                <tr>
                  <th className="px-4 py-3">File Name</th>
                  <th className="px-4 py-3">Chart</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {datasets.map((item) => (
                  <tr key={item._id} className="border-b border-gray-600 hover:bg-[#00acc1]/10 transition">
                    <td className="px-4 py-3 text-lg text-white">{item.datasetName}</td>
                    <td
                      onClick={() => handleShowClick(item._id)}
                      className="px-1 py-3 text-cyan-400 cursor-pointer hover:underline"
                    >
                      Show Chart
                    </td>
                    <td
                      onClick={() => handleDeleteClick(item._id)}
                      className="px-6 py-3  text-red-400 cursor-pointer hover:underline"
                    >
                      <RiDeleteBin6Line className="w-5 h-5" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400">You haven't uploaded any files yet.</p>
        )}
      </div>
    </section>
  );
};

export default Profile;


