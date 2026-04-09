import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiMapPin,
  FiStar,
  FiHeart,
  FiShare2,
  FiChevronLeft,
  FiCheck,
  FiUsers,
  FiClock
} from "react-icons/fi";
import { useHotels } from "../../context/HotelContext";
import Option from "../../components/Option";
import EditeForm from "../../components/EditeForm";
import toast from "react-hot-toast";

const DetailHotel = () => {
  const { id } = useParams();
  const { unHotel  } = useHotels();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showEdite, setShowEdite] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const data = await unHotel(id);
        setHotel(data);
      } catch (error) {
        toast.error("Erreur lors du chargement de l'hôtel");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHotel();
  }, [id, unHotel]);

  // Scroll top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Gestion favoris
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Retiré des favoris" : "Ajouté aux favoris");
  };

  // Gestion partage
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: hotel?.nom,
        text: hotel?.adresse,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié !");
    }
  };

  useEffect(() => {
  if (!showEdite && id) {
    unHotel(id).then(setHotel);
  }
}, [showEdite]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 mb-4">Hôtel introuvable</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-orange-400 text-white rounded-xl font-bold hover:bg-orange-500 transition"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-50">
      {/* Header sticky */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-400 transition font-semibold"
          >
            <FiChevronLeft size={18} />
            <span className="hidden sm:inline text-md">Retour</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handleFavorite}
              className={`p-3 rounded-full transition ${
                isFavorite ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FiHeart size={15} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button
              onClick={handleShare}
              className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            >
              <FiShare2 size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="w-full h-[80vh] overflow-y-scroll mx-auto px-4 sm:px-4 lg:px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">

          {/* Image principale */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 shadow-xl">
              <img
                src={hotel.image_url}
                alt={hotel.nom}
                className="w-full h-full object-cover"
              />
              {hotel?.disponible && (
                <div className="absolute top-4 left-4 px-4 py-2 bg-green-500 text-white rounded-full text-xs font-bold shadow-lg">
                  ✓ Disponible
                </div>
              )}
            </div>
          </div>

          {/* Informations hôtel */}
          <div className="space-y-6 sm:col-span-2">
            {/* Nom et localisation */}
            <div>
              <div className="flex items-start gap-2 text-orange-400 mb-2">
                <FiMapPin size={12} className="mt-0.5 flex-shrink-0" />
                <span className="text-xs font-semibold">{hotel.adresse}</span>
              </div>
              <h1 className="text-xl md:text-xl font-black text-gray-900 mb-4">
                {hotel.nom}
              </h1>
            </div>

            {/* Prix */}
            <div className="w-full flex items-center gap-1 sm:w-80 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-4">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-gray-900">
                  {parseInt(hotel.prix_par_nuit).toLocaleString()}
                </span>
                <span className="text-md text-gray-600 font-semibold">{hotel.devise}</span>
              </div>
              <p className="text-md text-gray-600 mt-1">/par nuit</p>
            </div>

            {/* Infos pratiques */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-gray-900 mb-4">Informations pratiques</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <FiUsers className="text-orange-400" size={20} />
                  <span className="text-sm"><strong>Capacité:</strong> 2-4 personnes</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FiClock className="text-orange-400" size={20} />
                  <span className="text-sm"><strong>Arrivée:</strong> 14:00</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FiClock className="text-orange-400" size={20} />
                  <span className="text-sm"><strong>Départ:</strong> 12:00</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-sm"><strong>Téléphone:</strong> {hotel.telephone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-sm"><strong>Email:</strong> {hotel.email_contact}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Option id={id} showEdite={showEdite} setShowEdite={setShowEdite} showDelete={showDelete} setShowDelete={setShowDelete}  />
      {showEdite && (
        <EditeForm id={id} showEdite={showEdite} setShowEdite={setShowEdite}  setHotel={setHotel} />
      )}
    </div>
  );
};

export default DetailHotel;