import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../Redux/Auth/Action";
import { toast } from "react-toastify";
import { div } from "three/tsl";

const UpdateProfile = ({ user, jwt, onClose }) => {
  const dispatch = useDispatch();
  const [updatedUser, setUpdatedUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });



  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!updatedUser.name || !updatedUser.email) {
      toast.error("Name and Email cannot be empty.");
      return;
    }

    try {
      const result = await dispatch(updateUser(user._id, updatedUser, jwt));
      // console.log("result from update profile", { result });
      if (result.success) {
        toast.success("Profile updated successfully!");
        dispatch(getUser(jwt));
        onClose();
      } else {
        toast.error(result.error || "Failed to update profile.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const loading = useSelector((store) => store.auth?.isLoading)

  if (loading) {
    return (
      <div className="flex flex-col items-center h-screen w-full justify-center gap-4 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="w-12 h-12 border-4 border-[#00acc1] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-gray-200 animate-pulse">
          Updating Profile...
        </p>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-all duration-300">
      <div className="w-full max-w-md bg-black/50 backdrop-blur-xl border border-[#00acc1]/40 rounded-2xl shadow-2xl p-6 text-white animate-fade-in-up">
        <h2 className="text-2xl font-bold text-center text-[#00acc1] mb-6">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-200">Name</label>
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-[#00acc1] focus:bg-white/20 transition-all"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              readOnly
              value={updatedUser.email}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-[#00acc1] focus:bg-white/20 transition-all"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full border border-gray-400 text-gray-300 hover:bg-gray-700 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-[#00acc1] to-cyan-600 text-black font-semibold rounded-full hover:scale-105 transition-transform"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
