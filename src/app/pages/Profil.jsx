import React, { useEffect, useState } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin ,FiCheck} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { CiUser } from "react-icons/ci";
import profil_img from '../../assets/image_profil/user_default.png'
import toast from "react-hot-toast";

import { RiUser6Fill } from "react-icons/ri";
import { GrUser } from "react-icons/gr";



const Profile = () => {
   const { admin , token , updateUser  ,fetchProfil} = useAuth()
   const [loading , setLoading ] = useState(false) 
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


 

  return (
    <div className="max-h-screen h-screen bg-gray-50 flex items-center justify-center px-4">
      
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-xs p-6 ">
        
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

          <h2 className="mt-3 text-lg font-bold text-gray-900">
            {admin.username} 
          </h2>
          
          {/* Input caché pour sélectionner une image + un label stylisé */}
          <label className="mt-2 text-xs text-yellow-500 cursor-pointer font-semibold hover:underline">
            Changer la photo
            <input 
              type="file" 
              accept="image/*" // N'accepter que les images
              className="hidden" // On le cache pour le rendre plus joli
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                    setForm({ ...form, profile_picture: e.target.files[0] });
                }
              }}
            />
          </label>
        </div>


        {/* INFOS */}
        <div className="mt-6 space-y-4">

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            <FiUser className="text-yellow-400" />
            <input 
             type="text"
             value={form.username}
             onChange={(e) => setForm({...form,username: e.target.value})}
             className="text-sm  bg-transparent lowercase text-black w-full h-full outline-none" />
            
            
          </div>


          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            <RiUser6Fill  className="text-yellow-400" />
               <input 
             type="text"
             value={form.first_name}
             onChange={(e) => setForm({...form,first_name: e.target.value})}
             placeholder="prenom"
             className="text-sm bg-transparent lowercase text-black w-full h-full outline-none" />
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
            <GrUser  className="text-yellow-400" />
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
             className="text-sm bg-transparent text-black w-full h-full outline-none" />
          </div>

        </div>

        {/* BOUTON */}
          <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-4 rounded-xl font-black text-xs mt-4 uppercase tracking-wider transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 ${
                  loading 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-yellow-400 to-yellow-500  hover:from-yellow-500 hover:to-yellow-600 text-white'
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
              <p className="text-xs text-gray-500 text-center mt-10">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
              
    

      </form>

    </div>
  );
};

export default Profile;