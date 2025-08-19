import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, getUser } from "../../Redux/Auth/Action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils/apiConfig";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user } = useSelector((store) => store.auth);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("jwt", token);
      dispatch(getUser(token));
      toast.success("Google Login Successful!");
      setTimeout(() => navigate("/"), 1000);
    }
  }, [location, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(register(userData))
      .then((res) => {
        if (res.success) {
          toast.success("Register Successful");
          if (user) {
            setTimeout(() => navigate("/"), 1000);
          } else {
            setTimeout(() => navigate("/login"), 1000);
          }
        } else {
          toast.error(res.message || "Something went wrong");
        }
      })
      .catch(() => {
        toast.error(error || "Something went wrong");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-[#00acc1] px-4 relative overflow-hidden">
      <ToastContainer />

      {/* Decorative background grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#00acc140_1px,transparent_1px)] [background-size:30px_30px] opacity-20"></div>

      <div className="relative mt-10 mb-10 z-10 w-full max-w-6xl flex flex-col lg:flex-row bg-black/50 backdrop-blur-lg rounded-3xl overflow-hidden shadow-[0_0_40px_5px_#00acc1] border border-[#00acc1]/20">

        {/* Left Side Form */}
        <div className="lg:w-1/2 p-10">
          <h1 className="text-3xl font-bold mb-2 tracking-wide text-[#00acc1]">Create Your Account 🚀</h1>
          <p className="text-[#00acc1]/70 mb-6">Join us and get started today</p>

          {/* Google Button */}
          <Link to={`${API_BASE_URL}/auth/google`}>
            <button className="w-full py-3 border border-[#00acc1] rounded-md text-[#00acc1] transition-all duration-300 flex items-center justify-center gap-2 mb-6 hover:bg-[#00acc1]/10">
              <div className="p-2 rounded-full">
                <svg className="w-4" viewBox="0 0 533.5 544.3">
                  <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                  <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                  <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                  <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
                </svg>
              </div>
              <span>Continue with Google</span>
            </button>
          </Link>

          {/* Divider */}
          <div className="relative text-center my-6">
            <span className="px-4 bg-black z-10 relative text-sm tracking-wider">OR</span>
            <div className="absolute top-1/2 left-0 w-full h-px bg-[#00acc1]/40 transform -translate-y-1/2"></div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {["name", "email", "password"].map((field) => (
              <div key={field}>
                <label className="block mb-1 text-sm capitalize">{field}</label>
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  required
                  placeholder={`Enter your ${field}`}
                  className="w-full px-4 py-3 bg-transparent border border-[#00acc1] rounded-md placeholder-[#00acc1]/50 text-[#00acc1] focus:outline-none focus:ring-2 focus:ring-[#00acc1]/80 transition"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-3 bg-[#00acc1] text-black font-semibold rounded-md hover:bg-[#00cde0] transition-all duration-300 shadow-md"
            >
              Create New Account
            </button>
          </form>

          <p className="mt-6 text-xs text-[#00acc1]/70 text-center">
            By registering, you agree to our{" "}
            <a href="#" className="underline hover:text-white">Terms</a> &{" "}
            <a href="#" className="underline hover:text-white">Privacy Policy</a>
          </p>
        </div>

        {/* Right Side Image */}
        <div className="flex-1 hidden lg:flex items-center justify-center p-6">
          <img
            src="register2.png"
            alt="Register Illustration"
            className="w-full h-full object-cover rounded-2xl shadow-lg"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
