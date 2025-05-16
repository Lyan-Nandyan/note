import React, { useState, useEffect } from 'react';
import axiosJWT from '../utils/axiosJWT';  // Import axiosJWT yang sudah disesuaikan dengan token
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from "../utils";

const EditNote = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate("/login");
        } else {
            getNoteById();
        }
    }, []);

    const updateNote = async (e) => {
        e.preventDefault();
        try {
            // Menggunakan axiosJWT untuk mengirimkan token saat memperbarui catatan
            await axiosJWT.patch(`${BASE_URL}/notes/${id}`, {
                title,
                body
            }, {
                withCredentials: true  // pastikan cookies (termasuk refresh token) dikirim
            });
            navigate("/");  // Arahkan kembali ke halaman utama setelah berhasil
        } catch (error) {
            console.log(error);
            // Penanganan error bisa diperbaiki lebih lanjut
        }
    }

    const getNoteById = async () => {
        try {
            const response = await axiosJWT.get(`${BASE_URL}/notes/${id}`, {
                withCredentials: true  // pastikan cookies dikirim untuk mendapatkan data yang benar
            });
            setTitle(response.data.title);
            setBody(response.data.body);
        } catch (error) {
            console.log(error);
            // Penanganan error jika gagal mengambil data catatan
        }
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={updateNote}>
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
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditNote;
