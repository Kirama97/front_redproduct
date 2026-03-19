import React, { useState } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Profile = () => {
 
  const [user] = useState({
    nom: "Thiam",
    prenom: "Mouhamet",
    email: "mouhamet@gmail.com",
    telephone: "+221 77 000 00 00",
    adresse: "Mbour, Sénégal",
    photo: "src/assets/image_profil/profil_img.jpg"
  });

  return (
    <div className="max-h-screen bg-gray-50 flex items-center justify-center px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 max-sm:mt-10">
        
        {/* PHOTO */}
        <div className="flex flex-col items-center">
          <img
            src={user.photo}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-orange-400"
          />
          <h2 className="mt-3 text-lg font-bold text-gray-900">
            {user.prenom} {user.nom}
          </h2>
          <p className="text-sm text-gray-500">Profil utilisateur</p>
        </div>

        {/* INFOS */}
        <div className="mt-6 space-y-4">

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            <FiUser className="text-orange-400" />
            <span className="text-sm text-gray-700">
              {user.prenom} {user.nom}
            </span>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            <FiMail className="text-orange-400" />
            <span className="text-sm text-gray-700">
              {user.email}
            </span>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            <FiPhone className="text-orange-400" />
            <span className="text-sm text-gray-700">
              {user.telephone}
            </span>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            <FiMapPin className="text-orange-400" />
            <span className="text-sm text-gray-700">
              {user.adresse}
            </span>
          </div>

        </div>

        {/* BOUTON */}
        <button className="mt-6 w-full py-3 bg-orange-400 text-white rounded-xl font-semibold hover:bg-orange-500 transition">
          Modifier le profil
        </button>

      </div>
    </div>
  );
};

export default Profile;