import express from "express";
import cors from "cors";
import NoteRoute from "./routes/NoteRoute.js";
import UserRoute from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: "https://lyan-frontend-dot-f-02-450706.uc.r.appspot.com",
  credentials: true,
}));
app.use(express.json());
app.get("/", (req, res) => res.render("index"));
app.use(NoteRoute);
app.use(UserRoute);

app.listen(5000,()=> console.log('server berjalan'))