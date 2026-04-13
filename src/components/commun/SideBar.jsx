import React from "react";
import image_bg from "../../assets/images/red-bg.png";
import logo from "../../assets/icone/logo.png";
import { CiUser } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaHotel } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import profil_img from '../../assets/image_profil/user_default.png'

const SideBar = ({ showSideBar ,setShowSideBar }) => {
  const {admin} = useAuth()


  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 text-sm transition-all
     ${
       isActive
         ? "bg-white text-neutral-700 font-medium"
         : "text-white hover:bg-white/20 hover:text-yellow-400"
     }`;

  return (
    <>
      {/* DESKTOP */}
      <div
        style={{ backgroundImage: `url(${image_bg})` }}
        className="hidden lg:flex  h-screen w-1/6 flex-col justify-between bg-center bg-cover z-40"
      >
        {/* TOP */}
        <div>
          <div className="flex items-center gap-3 px-4 py-6">
            <img src={logo} className="w-6 h-6" alt="logo" />
            <h1 className="text-white text-xs font-bold line-clamp-1">RED PRODUCT</h1>
          </div>

          {/* MENU */}
          <div>
            <p className="text-neutral-300 text-xs mb-3 px-4">
              Principal
            </p>

            <nav className="flex flex-col ">
              <NavLink to="/dashboard" className={linkClass}>
                <MdDashboard size={15} />
                 <p className="line-clamp-1">Dashboard</p>
              </NavLink>

              <NavLink to="/hotels" className={linkClass}>
                <FaHotel size={15} />
                 <p className="line-clamp-1">Liste des hôtels</p>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-4 py-4 border-t border-white/20">
          <div className="flex items-center gap-3">
            <NavLink
              to="/profil"
              title={`${admin?.first_name || "" } ${admin?.last_name || ""}`}
              className="flex items-center overflow-hidden w-10 h-10 justify-center bg-white rounded-full hover:bg-yellow-400 transition"
            >
              <img 
                src={
                   admin.profile_picture                   
                     ? admin.profile_picture
                     : profil_img                                 
                 }
                  alt="profile"
                  className="w-full h-full rounded-full object-cover border-1 border-yellow-400"
               />
            </NavLink>

            <div>
              <p className="text-sm text-white">{admin.username}</p>
              <p className="flex items-center gap-2 text-xs text-neutral-300">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                 <p className="line-clamp-1">En ligne</p>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div
        style={{ backgroundImage: `url(${image_bg})` }}
        className={`fixed top-0 left-0 h-screen w-64 bg-cover bg-center z-50 transform transition-transform duration-300 lg:hidden
        ${showSideBar ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* TOP */}
        <div className="flex items-center gap-3 px-4 py-6">
          <img src={logo} className="w-6 h-6" alt="logo" />
          <h1 className="text-white text-lg font-bold">RED PRODUCT</h1>
        </div>

        {/* MENU */}
        <div>
          <p className="text-neutral-300 text-sm mb-4 px-4">
            Principal
          </p>

          <nav className="flex flex-col gap-3">
            <NavLink to="/dashboard" className={linkClass} onClick={() => setShowSideBar(false)}>
              <MdDashboard size={20} />
              Dashboard
            </NavLink>

            <NavLink to="/hotels" className={linkClass} onClick={() => setShowSideBar(false)}>
              <FaHotel size={20} />
              Liste des hôtels
            </NavLink>
          </nav>
        </div>
      </div>

      {/* OVERLAY MOBILE */}
        {showSideBar && (
        <div
          onClick={() => setShowSideBar(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"></div>
      )}
    </>
  );
};

export default SideBar;