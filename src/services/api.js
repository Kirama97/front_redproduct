import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; 

console.log(BASE_URL)


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

   
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
         const { data } = await axios.post(`${BASE_URL}/auth/token/refresh/`, {
          refresh: refreshToken,
        });

        // Sauvegarder le nouveau access token
        localStorage.setItem('token', data.access);

        // Relancer la requête originale avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token aussi expiré → déconnecter l'utilisateur
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        window.location.href = '/connexion';  // Adapter selon votre router
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api