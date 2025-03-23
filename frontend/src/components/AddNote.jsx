import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { BASE_URL } from "../utils";

const AddNote = () => {
const [title, setTitle] = useState("");
const [body, setBody] = useState("");
const navigate = useNavigate();

const saveNote = async(e) => {
    e.preventDefault();
    try {
        await axios.post(`${BASE_URL}/notes`,{
            title,
            body
        });
        navigate("/");
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={saveNote}>
                <div className="field">
                    <label className='label'>Title</label>
                    <div className="control">
                        <input type="text" className='input' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title' />
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
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddNote