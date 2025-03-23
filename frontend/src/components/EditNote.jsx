import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from "../utils";

const EditNote = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getNoteById();
    }, []);

    const updateNote = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${BASE_URL}/notes/${id}`, {
                title,
                body
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const getNoteById = async () => {
        const response = await axios.get(`${BASE_URL}/notes/${id}`);
        setTitle(response.data.title);
        setBody(response.data.body);
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={updateNote}>
                    <div className="field">
                        <label className='label'>Title</label>
                        <div className="control">
                            <input type="text" className='input' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
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

export default EditNote