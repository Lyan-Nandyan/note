import {BrowserRouter, Routes, Route} from "react-router-dom"
import NoteList from "./components/NoteList";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<NoteList/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="add" element={<AddNote/>}/>
      <Route path="edit/:id" element={<EditNote/>}/>
      <Route path="register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
