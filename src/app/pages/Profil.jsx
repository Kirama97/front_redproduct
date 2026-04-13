import React, { useState } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { CiUser } from "react-icons/ci";


const Profile = () => {
   const { admin } = useAuth()
  //  console.log(admin)

 
  const [user] = useState({
   
    telephone: "",
    adresse: "",
    photo: "src/assets/image_profil/profil_img.jpg"
  });

  return (
    <div className="max-h-screen h-screen bg-gray-50 flex items-center justify-center px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xs p-6 ">
        
        {/* PHOTO */}
        <div className="flex flex-col items-center">
          <img
            src={user.photo}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400"
          />
          <h2 className="mt-3 text-lg font-bold text-gray-900">
            {admin.username} 
          </h2>
          <p className="text-sm text-gray-500">Profil utilisateur</p>
        </div>

        {/* INFOS */}
        <div className="mt-6 space-y-4">

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            <FiUser className="text-yellow-400" />
            <span className="text-sm text-gray-700">
              {admin.username}
            </span>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            <FiMail className="text-yellow-400" />
            <span className="text-sm text-gray-700">
              {admin.email}
            </span>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            <FiPhone className="text-yellow-400" />
            <span className="text-sm text-gray-700">
              {user.telephone}
            </span>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            <FiMapPin className="text-yellow-400" />
            <span className="text-sm text-gray-700">
              {user.adresse}
            </span>
          </div>

        </div>

        {/* BOUTON */}
        <button className="mt-6 w-full py-3 bg-yellow-400 text-white rounded-xl font-semibold hover:bg-yellow-400 transition">
          Modifier le profil
        </button>

      </div>
    </div>
  );
};

export default Profile;