import React, { useState } from "react";
import { FiArrowLeft, FiUpload, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

const AjouterHotel = ({ setShowAddHotel, onSave }) => {
  const [form, setForm] = useState({
    nom: "",
    adresse: "",
    email: "",
    telephone: "",
    prix: "",
    devise: "F XOF"
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const DEVISES = ["F XOF", "EUR", "USD", "GNF"];

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validation taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image trop volumineuse (max 5MB)");
      return;
    }

    setPhoto(file);

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.nom.trim()) {
      toast.error("Nom de l'hôtel requis");
      return;
    }
    if (!form.adresse.trim()) {
      toast.error("Adresse requise");
      return;
    }
    if (!form.email.trim()) {
      toast.error("E-mail requis");
      return;
    }
    if (!form.telephone.trim()) {
      toast.error("Numéro de téléphone requis");
      return;
    }
    if (!form.prix) {
      toast.error("Prix par nuit requis");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nom", form.nom);
      formData.append("adresse", form.adresse);
      formData.append("email", form.email);
      formData.append("telephone", form.telephone);
      formData.append("prix", form.prix);
      formData.append("devise", form.devise);
      
      if (photo) {
        formData.append("photo", photo);
      }

      await onSave(formData);
      toast.success("Hôtel créé avec succès !");
      
      // Reset form
      setForm({
        nom: "",
        adresse: "",
        email: "",
        telephone: "",
        prix: "",
        devise: "F XOF"
      });
      setPhoto(null);
      setPhotoPreview(null);
      
    } catch (error) {
      toast.error(error.message || "Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0   max-h-screen  bg-neutral-400/20 py-2 sm:py-8 px-4" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="max-w-2xl  mx-auto bg-white rounded-2xl overflow-hidden">
        
      
        {/* Card */}
        <div className="bg-white  shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Title */}
          <div className="px-6 py-5 border-b border-gray-300">
            <button 
              onClick={() => setShowAddHotel(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-yellow-400 transition-colors mb-3"
            >
              <FiArrowLeft size={18} />
              <span className="text-sm font-medium">Retour</span>
            </button>
            <h2 className="text-xs font-bold text-gray-900 mt-5 uppercase tracking-tight">
              Créer un nouveau hôtel
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Nom de l'hôtel
                </label>
                <input
                  type="text"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  placeholder="CAP Marniane"
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Adresse
                </label>
                <input
                  type="text"
                  value={form.adresse}
                  onChange={(e) => setForm({ ...form, adresse: e.target.value })}
                  placeholder="Les îles du saloum, Mar Lodj"
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="information@gmail.com"
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  value={form.telephone}
                  onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                  placeholder="+221 77 777 77 77"
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            </div>

          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Prix par nuit
                </label>
                <input
                  type="number"
                  value={form.prix}
                  onChange={(e) => setForm({ ...form, prix: e.target.value })}
                  placeholder="25 000"
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Devise
                </label>
                <select
                  value={form.devise}
                  onChange={(e) => setForm({ ...form, devise: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-gray-400 transition-colors appearance-none cursor-pointer"
                >
                  {DEVISES.map((devise) => (
                    <option key={devise} value={devise}>
                      {devise}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Photo Upload */}
           {/* Photo Upload */}
            <div className=" h-30 sm:h-40">
            <label className="block text-xs font-medium text-gray-600 mb-2">
                Ajouter une photo
            </label>

            {photoPreview ? (
                <div className="relative border-2 h-16 border-gray-200 rounded-xl overflow-hidden">
                <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                />
                <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                    <FiX size={12} className="text-gray-600" />
                </button>
                </div>
            ) : (
                <label className="block cursor-pointer">
                <div className="border-2 h-[100px] flex items-center justify-center border-dashed border-gray-300 rounded-xl py-4 px-2 hover:border-gray-400 hover:bg-gray-50 transition-all">
                    <div className="flex items-center justify-center gap-2">
                    <FiUpload size={14} className="text-gray-400" />
                    <p className="text-xs text-gray-500 font-medium">
                        Ajouter une photo
                    </p>
                    </div>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                />
                </label>
            )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gray-800 text-white text-sm font-semibold rounded-xl hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enregistrement...
                  </span>
                ) : (
                  "Enregistrer"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjouterHotel;