import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { BASE_URL } from "../utils";

const NoteList = () => {
    const [notes, setNote] = useState([]);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        const response = await axios.get(`${BASE_URL}/notes`);
        setNote(response.data);
    }

const deleteNote = async (id) =>{
    try {
        await axios.delete(`${BASE_URL}/notes/${id}`);
        getNotes();
    } catch (error) {
        console.log(error);
    }
}

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-three-quarters">
                <Link to={`add`} className='button is-sucess'>Add New</Link>
                <table className='table is-striped is-fullwidth'>
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
                                <td>
                                    <Link to={`edit/${note.id}`} className='button is-small is-info'>Edit</Link>
                                    <button onClick={()=>deleteNote(note.id)} className='button is-small is-danger'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default NoteList