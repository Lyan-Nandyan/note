import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosJWT from '../utils/axiosJWT';
import { BASE_URL } from "../utils";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const getNotes = async () => {
    try {
      const response = await axiosJWT.get(`${BASE_URL}/notes`, {
        withCredentials: true
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Gagal memuat catatan:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    } else {
      getNotes();
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axiosJWT.delete(`${BASE_URL}/logout`, {
        withCredentials: true
      });

      localStorage.removeItem('accessToken');

      navigate('/login');
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Yakin ingin menghapus catatan ini?")) return;

    try {
      await axiosJWT.delete(`${BASE_URL}/notes/${id}`, {
        withCredentials: true
      });
      getNotes();
    } catch (error) {
      console.error("Gagal menghapus catatan:", error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-three-quarters">
        <div className="is-flex is-justify-content-space-between mb-3">
          <Link to="add" className="button is-success">Add New</Link>
          <button onClick={handleLogout} className="button is-danger">Logout</button>
        </div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Body</th>
              <th>CreateAt</th>
              <th>UpdateAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={note.id}>
                <td>{index + 1}</td>
                <td>{note.title}</td>
                <td>{note.body}</td>
                <td>{new Date(note.createdAt).toLocaleString("id-ID")}</td>
                <td>{new Date(note.updatedAt).toLocaleString("id-ID")}</td>
                <td className="buttons">
                  <Link to={`edit/${note.id}`} className="button is-small is-info">Edit</Link>
                  <button onClick={() => deleteNote(note.id)} className="button is-small is-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoteList;
