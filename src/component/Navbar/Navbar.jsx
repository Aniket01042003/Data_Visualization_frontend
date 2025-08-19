import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../Redux/Auth/Action';
import ShowDataset from '../UploadData/ShowDataset.jsx';

const Navbar = () => {
  const user = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const firstName = user?.user?.name[0];
  const [activeItem, setActiveItem] = useState("Home");
  const jwt = (localStorage.getItem("jwt") == " " ? null : localStorage.getItem("jwt"));



  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);


  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`lg:px-16 px-4 bg-gradient-to-br  from-black via-black to-gray-900 text-lg text-white flex flex-wrap items-center py-4 shadow-md `}>
      <div className="flex-1 flex justify-between items-center" onClick={() => setActiveItem("Home")}>
        <Link to="/" className="text-l flex justify-center items-center">
          <img className="w-[3rem] h-[3rem]" src="Comlogo.png" alt="img" />
          <span className="pl-[8px] ">JUST-DV</span>
        </Link>
      </div>

      {/* Mobile menu toggle */}
      <button onClick={toggleMenu} className="cursor-pointer md:hidden block">
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>

      {/* Menu items */}
      <div className={`${menuOpen ? "block" : "hidden"} md:flex md:items-center md:w-auto w-full`}>
        <nav>
          <ul className="md:flex items-center justify-between text-base  pt-4 md:pt-0">
            {[
              { label: "Home", path: "/" },
              { label: "About Us", path: "/about" },
              { label: "All files", path: "/showdataset", element: <ShowDataset setActiveItem={setActiveItem} /> },
              { label: "Contact Us", path: "/contact" },
              { label: "Register", path: "/register" },
              { label: "Admin", path: "/admin-login" }
            ].map(({ label, path }) => (
              <li key={label} className={`${activeItem === label ? "text-[#00acc1] border border-white text-lg" : ""} m-1 hover:border hover:border-white rounded-lg`} onClick={() => setActiveItem(label)}>
                <Link to={path} className="md:p-4 py-3 px-1 block md:mb-0 mb-2" onClick={closeMenu}>
                  {label}
                </Link>
              </li>
            ))}

            <li>
              {firstName ? (
                <Link to="/profile" className={`md:p-4 py-3 px-0 block md:mb-0 mb-2 `} onClick={() => {
                  setActiveItem("Profile");
                  closeMenu();
                }}>
                  <div className={`flex justify-center items-center ${activeItem === 'Profile' ? "text-[#00acc1] border-[2px] border-white text-lg" : ""} text-white bg-purple-500 rounded-2xl hover:border hover:border-white w-[2rem] h-[2rem]`}>
                    {firstName}
                  </div>
                </Link>
              ) : (
                <Link to="/login" onClick={() => {
                  setActiveItem("Login");
                  closeMenu();
                }} className={`md:p-4 py-3 px-0 block md:mb-0 m-1 hover:border hover:border-white rounded-lg ${activeItem === "Login" ? "text-[#00acc1] border border-white text-lg" : ""}`}>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>

    </header>
  );
};

export default Navbar;
