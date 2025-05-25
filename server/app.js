import express from 'express';
import { json, urlencoded } from 'body-parser';
const app = express()
import authRoute from "./routes/authRoute";
import { verify } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import { join } from "node:path";
import folderRoute from './routes/folderRoute';
import fileRoute from './routes/fileRoute';
import cors from 'cors';
import { shareDownload } from './controllers/shareController';

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true               
}));


app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(json());
app.use(urlencoded({ extended: true }));

const secret = 'a santa at nasa';


app.use(cookieParser());


app.use("/auth", authRoute)

app.get("/", (req, res) => {
  res.render("homepage")
})

app.get("/log-out", (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.sendStatus(401);

  try {
    const decoded = verify(token, secret);
    req.user = decoded; 
    next();
  } catch (err) {
    res.sendStatus(403);
  }
}


app.use("/folder", authenticateToken, folderRoute);
app.use("/file", authenticateToken, fileRoute);
app.use("/auth-check", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Authenticated" });
});


app.get("/share/:uid", shareDownload)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})