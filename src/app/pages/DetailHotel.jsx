import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiMapPin,
  FiStar,
  FiHeart,
  FiShare2,
  FiChevronLeft,
  FiCheck,
  FiWifi,
  FiCoffee,
  FiTv,
  FiUsers,
  FiCalendar,
  FiClock
} from "react-icons/fi";
import { FaParking, FaSwimmingPool, FaDumbbell } from "react-icons/fa";
import toast from "react-hot-toast";

const DetailHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données exemple
        setProduct({
          id: id,
          titre: "Hôtel Radisson Blu Sea Plaza",
          localisation: "Dakar, Sénégal",
          prix: 75000,
          images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
          ],
          description: "Découvrez le luxe absolu dans notre hôtel 5 étoiles situé en bord de mer. Profitez d'une vue panoramique sur l'océan, de chambres spacieuses et élégamment décorées, et d'un service exceptionnel.",
          rating: 4.8,
          reviews: 245,
          amenities: [
            { icon: FiWifi, label: "WiFi gratuit" },
            { icon: FaSwimmingPool, label: "Piscine" },
            { icon: FaDumbbell, label: "Salle de sport" },
            { icon: FaParking, label: "Parking gratuit" },
            { icon: FiCoffee, label: "Petit-déjeuner" },
            { icon: FiTv, label: "TV satellite" }
          ],
          highlights: [
            "Vue sur l'océan",
            "Restaurant gastronomique",
            "Spa & Wellness",
            "Salle de conférence",
            "Service en chambre 24h/24",
            "Navette aéroport"
          ],
          capacity: "2-4 personnes",
          checkIn: "14:00",
          checkOut: "12:00",
          disponible: true
        });
        
      } catch (error) {
        console.error("Erreur:", error);
        toast.error("Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Retiré des favoris" : "Ajouté aux favoris");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.titre,
        text: product?.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié !");
    }
  };



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

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 mb-4">Produit introuvable</p>
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
    <div className="  bg-gray-50">
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
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
                  isFavorite
                    ? "bg-red-50 text-red-500"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
      </div>

      <div className="w-full h-[80vh] overflow-y-scroll mx-auto px-4 sm:px-4 lg:px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        
          <div className=" space-y-4">
            {/* Image principale */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 shadow-xl">
              <img
                src={product.images[selectedImage]}
                alt={product.titre}
                className="w-full h-full object-cover"
              />
              
              {/* Badge disponibilité */}
              {product.disponible && (
                <div className="absolute top-4 left-4 px-4 py-2 bg-green-500 text-white rounded-full text-xs font-bold shadow-lg">
                  ✓ Disponible
                </div>
              )}
            </div>

            {/* Miniatures */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden transition-all ${
                    selectedImage === index
                      ? "ring-4 ring-orange-400 scale-95"
                      : "ring-2 ring-transparent hover:ring-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.titre} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

        
          <div className="space-y-6 sm:col-span-2">
            
            {/* Titre et localisation */}
            <div>
              <div className="flex items-start gap-2 text-orange-400 mb-2">
                <FiMapPin size={12} className="mt-0.5 flex-shrink-0" />
                <span className="text-xs font-semibold">{product.localisation}</span>
              </div>
              
              <h1 className="text-xl md:text-xl font-black text-gray-900 mb-4">
                {product.titre}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={15}
                      className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="font-bold text-gray-900">{product.rating}</span>
                <span className="text-gray-500">({product.reviews} avis)</span>
              </div>
            </div>

            {/* Prix */}
            <div className="w-full sm:w-40 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-4">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-gray-900">
                  {product.prix.toLocaleString()}
                </span>
                <span className="text-lg text-gray-600 font-semibold">FCFA</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">par nuit</p>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-md font-black text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 text-md leading-relaxed">{product.description}</p>
            </div>

            {/* Équipements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-md font-black text-gray-900 mb-4">Équipements</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {product.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <amenity.icon className="text-orange-400" size={15} />
                    <span className="text-sm font-semibold text-gray-700">
                      {amenity.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Points forts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-md font-black text-gray-900 mb-4">Points forts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <FiCheck className="text-green-600" size={12} />
                    </div>
                    <span className="text-xs text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Infos pratiques */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-gray-900 mb-4">Informations pratiques</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <FiUsers className="text-orange-400" size={20} />
                  <span className="text-sm"><strong>Capacité:</strong> {product.capacity}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FiClock className="text-orange-400" size={20} />
                  <span className="text-sm"><strong>Arrivée:</strong> {product.checkIn}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FiClock className="text-orange-400" size={20} />
                  <span className="text-sm"><strong>Départ:</strong> {product.checkOut}</span>
                </div>
              </div>
            </div>

         
          </div>
        </div>

      
     
      </div>
    </div>
  );
};

export default DetailHotel;