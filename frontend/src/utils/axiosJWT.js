import axios from 'axios';
import { BASE_URL } from '../utils';

// Buat instance axios khusus
const axiosJWT = axios.create({
  baseURL: BASE_URL,
  withCredentials: true // agar kirim cookie (refreshToken)
});

// Tambahkan interceptor request → selalu sertakan accessToken jika ada
axiosJWT.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response → untuk handle expired token & refresh otomatis
axiosJWT.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Cegah infinite loop (hanya refresh sekali untuk 401/403)
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true; // tanda bahwa kita sudah mencoba refresh

      try {
        // Panggil endpoint refresh token
        const res = await axios.get(`${BASE_URL}/token`, {
          withCredentials: true // penting agar refreshToken (cookie) terkirim
        });

        const newAccessToken = res.data.accessToken;

        // Simpan token baru dan ulangi request sebelumnya
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosJWT(originalRequest); // ulangi pakai axiosJWT agar pakai interceptor juga
      } catch (err) {
        console.error("Refresh token failed:", err);
        localStorage.removeItem('accessToken'); // hapus token lama
        window.location.href = "/login"; // logout paksa / redirect ke login
      }
    }

    return Promise.reject(error);
  }
);

export default axiosJWT;
