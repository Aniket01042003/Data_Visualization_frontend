import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { adminLogin } from "../../Redux/Admin/Action";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const res = useSelector((store) => store.adminLogin);

  // const loading = useSelector((store) => store.adminLogin?.isLoading)


  useEffect(() => {
    if (res.adminInfo) {
      navigate("/admin");
    }
    if (res.error) {
      toast.error("Bad login Check Credentials ");
    }
  }, [res.adminInfo, navigate]);

  const handleLogin = (e) => {
  e.preventDefault();

  // ✅ Block login for mobile devices
  if (window.innerWidth < 750) {
    toast.error("Not supported for mobile. Try on desktop!");
    return;
  }

  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");

  dispatch(adminLogin(email, password))
    .then((res) => {
      if (res.success) {
        toast.success("Admin Login Successful");
      } else {
        toast.error(res.message || "Invalid Credentials");
      }
    })
    .catch(() => toast.error("Something went wrong. Try again!"));
};



  return (
    <section className="h-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-[#00acc1] px-4">
      <div className="w-full max-w-lg bg-black/40 backdrop-blur-md rounded-xl overflow-hidden shadow-[0_0_30px_5px_#00acc1] p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#00acc1]"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 rounded-md bg-black border border-[#00acc1] text-white placeholder:text-[#00acc1]/50 focus:outline-none focus:ring-2 focus:ring-[#00acc1]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#00acc1]"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 rounded-md bg-black border border-[#00acc1] text-white placeholder:text-[#00acc1]/50 focus:outline-none focus:ring-2 focus:ring-[#00acc1]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md flex justify-center bg-[#00acc1] hover:bg-[#008b9a] text-black font-semibold transition-colors"
          >
            {/* Login */}
            {!res.loading && <div className=" ">Login</div>}
            {res.loading && (<div className="max-w-8 h-8 border-4 border-white border-t-transparent flex justify-center rounded-full animate-spin"></div>)}
          </button>

        </form>

      </div>
    </section>
  );
};

export default AdminLoginForm;
