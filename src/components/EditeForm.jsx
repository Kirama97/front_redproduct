import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiUpload, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../services/api";
import { useHotels } from "../context/HotelContext";

const EditeForm = ({ setShowEdite,showEdite, id }) => {

  const { refreshHotels,  unHotel } = useHotels();

  const [form, setForm] = useState({
    nom: "",
    adresse: "",
    email_contact: "",
    telephone: "",
    prix_par_nuit: "",
    devise: "F XOF",
  });

  const [image, setImage] = useState(null);         
  const [imagePreview, setImagePreview] = useState(null); 
  const [imageExistante, setImageExistante] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const DEVISES = ["F XOF", "EUR", "USD", "GNF"];

 
  useEffect(() => {
    const chargerHotel = async () => {
      try {
        const data = await unHotel(id);
        setForm({
          nom:           data.nom           || "",
          adresse:       data.adresse       || "",
          email_contact: data.email_contact || "",
          telephone:     data.telephone     || "",
          prix_par_nuit: data.prix_par_nuit || "",
          devise:        data.devise        || "F XOF",
        });
       
        if (data.image_url) {
          setImageExistante(data.image_url);
          setImagePreview(data.image_url);
        }
      } catch {
        toast.error("Impossible de charger les données de l'hôtel");
        setShowEdite(false);
      } finally {
        setLoadingData(false);
      }
    };

    chargerHotel();
  }, [id]);

 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image trop volumineuse (max 5MB)");
      return;
    }
    setImage(file);
    setImageExistante(null); 
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    setImageExistante(null);
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nom.trim()) return toast.error("Nom requis");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("nom",           form.nom);
      formData.append("adresse",       form.adresse);
      formData.append("email_contact", form.email_contact);
      formData.append("telephone",     form.telephone);
      formData.append("prix_par_nuit", form.prix_par_nuit);
      formData.append("devise",        form.devise);

     
      if (image) formData.append("image", image);

      await api.put(`/hotels/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Hôtel modifié avec succès !");
      await refreshHotels();
      setShowEdite(false);

    } catch (error) {
      console.error(error.response?.data);
      toast.error(
        error.response?.data?.detail ||
        error.response?.data?.nom?.[0] ||
        "Erreur lors de la modification"
      );
    } finally {
      setLoading(false);
    }
  };

 
  if (loadingData) {
    return (
      <div className="absolute inset-0 bg-neutral-400/50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-600">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 max-h-screen z-50 bg-neutral-400/50 sm:bg-neutral-400/40 py-2 sm:py-0 px-4"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden">
        <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">

          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-300">
            <button
              onClick={() => setShowEdite(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-yellow-400 transition-colors mb-3"
            >
              <FiArrowLeft size={18} />
              <span className="text-sm font-medium">Retour</span>
            </button>
            <h2 className="text-xs font-bold text-gray-900 mt-5 uppercase tracking-tight">
              Modifier l'hôtel
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="h-[70vh] overflow-y-auto p-4 space-y-4">

            {/* Nom + Adresse */}
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

            {/* Email + Téléphone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={form.email_contact}
                  onChange={(e) => setForm({ ...form, email_contact: e.target.value })}
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

            {/* Prix + Devise */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Prix par nuit
                </label>
                <input
                  type="number"
                  value={form.prix_par_nuit}
                  onChange={(e) => setForm({ ...form, prix_par_nuit: e.target.value })}
                  placeholder="25 000"
                  min="0"
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
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
                >
                  {DEVISES.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image */}
            <div className="h-30 sm:h-40">
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Photo de l'hôtel
              </label>
              {imagePreview ? (
                <div className="relative border-2 h-16 border-gray-200 rounded-xl overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Badge si image existante Cloudinary */}
                  {imageExistante && !image && (
                    <span className="absolute bottom-1 left-2 text-[10px] bg-black/50 text-white px-2 py-0.5 rounded-full">
                      Image actuelle
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
                  >
                    <FiX size={12} className="text-gray-600" />
                  </button>
                </div>
              ) : (
                <label className="block cursor-pointer">
                  <div className="border-2 h-[100px] flex items-center justify-center border-dashed border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all">
                    <div className="flex items-center gap-2">
                      <FiUpload size={14} className="text-gray-400" />
                      <p className="text-xs text-gray-500 font-medium">
                        Changer l'image
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gray-800 text-white text-sm font-semibold rounded-xl hover:bg-gray-900 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enregistrement...
                  </span>
                ) : "Enregistrer les modifications"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditeForm;