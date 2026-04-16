import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiArrowLeft, FiUser, FiMail, FiMapPin, FiCalendar } from "react-icons/fi";
import profil_img from '../../assets/image_profil/user_default.png';

const Utilisateur = () => {
  const { id } = useParams();
  const { utilisateurs = [], loading } = useAuth();

  const user = (utilisateurs || []).find(u => u.id?.toString() === id);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Utilisateur introuvable</h2>
        <p className="text-gray-500 mb-6">Cet utilisateur n'existe pas ou a été supprimé.</p>
        <Link to="/utilisateurs" className="px-6 py-2 bg-yellow-400 text-white rounded-lg font-bold shadow-md hover:bg-yellow-500 transition-all">
          Retour à la liste
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Link to="/utilisateurs" className="inline-flex items-center gap-2 text-gray-600 hover:text-yellow-500 transition-colors mb-8 font-medium">
        <FiArrowLeft />
        Retour à la liste
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Cover / Header Section */}
          <div className="h-32 bg-gradient-to-r from-yellow-400 to-yellow-500" />
          
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-6 flex flex-col md:flex-row md:items-end gap-6">
              <img 
                src={user.profile_picture || profil_img} 
                alt={user.username}
                className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-white"
                onError={(e) => { e.target.src = profil_img }}
              />
              <div className="pb-2">
                <h1 className="text-3xl font-bold text-gray-900">{user.first_name} {user.last_name}</h1>
                <p className="text-yellow-600 font-medium">@{user.username}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              {/* Personal Info */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Informations personnelles</h2>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-yellow-500 group-hover:bg-yellow-500 group-hover:text-white transition-all">
                    <FiUser />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block">Nom complet</label>
                    <span className="text-gray-700 font-medium">{user.first_name} {user.last_name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-yellow-500 group-hover:bg-yellow-500 group-hover:text-white transition-all">
                    <FiMail />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block">Adresse Mail</label>
                    <span className="text-gray-700 font-medium">{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Status Info */}
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Statut du compte</h2>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-yellow-500 group-hover:bg-yellow-500 group-hover:text-white transition-all">
                    <FiCalendar />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block">Date d'inscription</label>
                    <span className="text-gray-700 font-medium">
                      {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'Non renseignée'}
                    </span>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100">
                  <p className="text-xs text-yellow-700 leading-relaxed italic">
                    Note : Ce compte est actuellement actif et vous visualisez ses informations en mode lecture uniquement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Utilisateur;
