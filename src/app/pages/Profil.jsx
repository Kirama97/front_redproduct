import React, { useEffect, useState } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin ,FiCheck, FiLock} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { CiUser } from "react-icons/ci";
import profil_img from '../../assets/image_profil/user_default.png'
import toast from "react-hot-toast";

import { RiUser6Fill } from "react-icons/ri";
import { GrUser } from "react-icons/gr";



const Profile = () => {
   const { admin , token , updateUser  ,fetchProfil, change_password } = useAuth()
   const [loading , setLoading ] = useState(false) 
   const [resetLoading, setResetLoading] = useState(false)
   const [oldPassword, setOldPassword] = useState("")
   const [newPassword, setNewPassword] = useState("")
   const [error, setError ] = useState() 
   const [form , setForm] = useState({
      username:"",
      first_name: "" ,
      last_name:"" ,
      profile_picture: null,
   }

   )

   console.log(admin)

useEffect(() => {
  if (!admin) return;

  const chargerProfil = async () => {
    setLoading(true);
    try {
      const user = admin;

      setForm({
        username: user.username || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
         profile_picture: null,
      });

    } catch {
      toast.error("Impossible de charger les données du user");
    } finally {
      setLoading(false);
    }
  };

  chargerProfil();
}, [admin]);



   const handleSubmit = async (e) => {
     e.preventDefault();
     setLoading(true)

     try {
        const formData = new FormData();
        formData.append("username",  form.username);
        formData.append("first_name",form.first_name);
        formData.append("last_name", form.last_name);

        if(form.profile_picture){
          formData.append("profile_picture" , form.profile_picture)
        }
       
        await updateUser(formData)
        await fetchProfil()
        toast.success("profil modifié avec succès !");

          setForm((prev) => ({ ...prev, profile_picture: null }));
        } catch (error) {
          console.error(error.response?.data);
        
        } finally {
          setLoading(false);
        }
      
   }

   const handleChangePassword = async (e) => {
     e.preventDefault();
     if (!oldPassword || !newPassword) return;
     setResetLoading(true);
     try {
       await change_password(oldPassword, newPassword);
       toast.success("Mot de passe modifié avec succès !");
       setOldPassword("");
       setNewPassword("");
     } catch (error) {
       toast.error(error.response?.data?.old_password?.[0] || error.response?.data?.detail || "Erreur lors de la modification du mot de passe.");
     } finally {
       setResetLoading(false);
     }
   }

 

  return (
      <div className="h-[90vh] overflow-y-auto">

         <div className=" mt-5 flex flex-col lg:flex-row items-start justify-center gap-6 px-4 max-w-5xl mx-auto mb-10">
      
              {/* BOX GAUCHE : Profil */}
              <form onSubmit={handleSubmit} className="w-full lg:w-1/2 bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-md font-bold text-gray-800 mb-6 text-center border-b pb-2">Informations Personnelles</h3>
                
                {/* PHOTO */}
                <div className="flex flex-col items-center">
                  <img
                    src={
                      form.profile_picture
                        ? URL.createObjectURL(form.profile_picture)  
                        : admin.profile_picture                        
                        ? admin.profile_picture
                        : profil_img                                 
                    }
                    alt="profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400"
                  />

                  <h2 className="mt-2 text-lg font-bold text-gray-900">
                    {admin.username} 
                  </h2>
                  
                  <label className="mt-2 text-xs text-yellow-500 cursor-pointer font-semibold hover:underline">
                    Changer la photo
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setForm({ ...form, profile_picture: e.target.files[0] });
                        }
                      }}
                    />
                  </label>
                </div>

                {/* INFOS */}
                <div className="mt-3 space-y-4">
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                    <FiUser className="text-yellow-400" />
                    <input 
                    type="text"
                    value={form.username}
                    onChange={(e) => setForm({...form,username: e.target.value})}
                    className="text-sm bg-transparent lowercase text-black w-full h-full outline-none" />
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                    <RiUser6Fill className="text-yellow-400" />
                    <input 
                    type="text"
                    value={form.first_name}
                    onChange={(e) => setForm({...form,first_name: e.target.value})}
                    placeholder="prenom"
                    className="text-sm bg-transparent lowercase text-black w-full h-full outline-none" />
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                    <GrUser className="text-yellow-400" />
                    <input 
                    type="text"
                    value={form.last_name}
                    onChange={(e) => setForm({...form,last_name: e.target.value})}
                    placeholder="nom"
                    className="text-sm bg-transparent lowercase text-black w-full h-full outline-none" />
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                    <FiMail className="text-yellow-400" />
                    <input 
                    type="email"
                    disabled
                    value={admin?.email || ""}
                    readOnly
                    className="text-sm bg-transparent text-gray-500 w-full h-full outline-none cursor-not-allowed" />
                  </div>
                </div>

                {/* BOUTON SAUVEGARDER PROFIL */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full mt-8 py-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 ${
                    loading 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : ' bg-yellow-400   hover:bg-yellow-500 text-white'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                      Modification en cours...
                    </>
                  ) : (
                    <>
                      <FiCheck size={16} />
                      Enregistrer les modifications
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 text-center mt-6">
                  Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                </p>
              </form>

              {/* BOX DROITE : Mot de passe */}
              <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-6 text-center border-b pb-2">Sécurité</h3>
                
                <p className="text-sm text-gray-500 mb-6 text-center">
                  Modifiez votre mot de passe pour sécuriser votre compte.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                    <FiLock className="text-yellow-400" />
                    <input 
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Ancien mot de passe"
                    className="text-sm bg-transparent text-black w-full h-full outline-none" />
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                    <FiLock className="text-yellow-400" />
                    <input 
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nouveau mot de passe"
                    className="text-sm bg-transparent text-black w-full h-full outline-none" />
                  </div>
                </div>

                {/*  CHANGER MDP */}
                <button 
                  type="button" 
                  onClick={handleChangePassword}
                  disabled={resetLoading || !oldPassword || !newPassword}
                  className={`w-full mt-8 py-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 ${
                    resetLoading || !oldPassword || !newPassword
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                      : 'bg-gray-800 text-white hover:bg-gray-900'
                  }`}
                >
                  {resetLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      Modification...
                    </>
                  ) : (
                    <>
                      <FiLock size={16} />
                      Modifier le mot de passe
                    </>
                  )}
                </button>
              </div>

              </div> 
              

      </div>
  );
};

export default Profile;