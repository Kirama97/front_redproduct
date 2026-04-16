import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiInfo } from "react-icons/fi";
import profil_img from '../../assets/image_profil/user_default.png';

const Utilisateurs = () => {
  const { utilisateurs = [], loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = (utilisateurs || []).filter((user) => 
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Utilisateurs</h1>
          <p className="text-sm text-gray-500">Liste de tous les utilisateurs inscrits ({filteredUsers.length})</p>
        </div>

        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Rechercher un utilisateur..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img 
                  src={user.profile_picture || profil_img} 
                  alt={user.username} 
                  className="w-20 h-20 rounded-full object-cover border-2 border-yellow-400 p-0.5"
                  onError={(e) => { e.target.src = profil_img }}
                />
              </div>
              
              <h3 className="font-bold text-gray-800 text-lg line-clamp-1">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-1">{user.email}</p>
              
              <Link 
                to={`/utilisateur/${user.id}`}
                className="mt-auto w-full py-2 bg-yellow-50 text-yellow-600 rounded-lg text-sm font-bold hover:bg-yellow-500 hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <FiInfo />
                Voir détails
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <FiUser size={48} className="text-gray-200 mb-4" />
          <p className="text-gray-500 font-medium">Aucun utilisateur trouvé</p>
        </div>
      )}
    </div>
  );
};

export default Utilisateurs;
