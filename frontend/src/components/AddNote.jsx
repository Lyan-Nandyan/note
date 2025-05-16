import React, { useState, useEffect } from 'react';
import axiosJWT from '../utils/axiosJWT';  // Import axiosJWT yang sudah disesuaikan dengan token
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../utils";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  // Mengecek jika token ada
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate("/login");  // Arahkan ke halaman login jika token tidak ada
    }
  }, [navigate]);

  const saveNote = async (e) => {
    e.preventDefault();
    try {
      // Menggunakan axiosJWT untuk mengirimkan token
      await axiosJWT.post(`${BASE_URL}/notes`, {
        title,
        body
      }, {
        withCredentials: true  // pastikan cookies dikirimkan (termasuk refresh token jika diperlukan)
      });
      navigate("/");  // Arahkan ke halaman utama setelah berhasil menyimpan
    } catch (error) {
      console.log(error);
      // Anda bisa menambahkan penanganan error yang lebih spesifik
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveNote}>
          <div className="field">
            <label className='label'>Title</label>
            <div className="control">
              <input
                type="text"
                className='input'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
                required
              />
            </div>
          </div>
          <div className="field">
            <label className='label'>Note</label>
            <div className="control">
              <textarea
                className='textarea'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder='Note'
                required
              ></textarea>
            </div>
          </div>
          <div className="field">
            <button type='submit' className='button is-success'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
