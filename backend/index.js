import express from "express";
import cors from "cors";
import NoteRoute from "./routes/NoteRoute.js";
import UserRoute from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({credentials:true, origin:"http://localhost:3000"}));
app.use(express.json());
app.use(NoteRoute);
app.use(UserRoute);

app.listen(5000,()=> console.log('server berjalan'))