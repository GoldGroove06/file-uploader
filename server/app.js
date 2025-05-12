const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const authRoute = require("./routes/authRoute")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const path = require("node:path");
const folderRoute = require('./routes/folderRoute');
const fileRoute = require('./routes/fileRoute');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true               
}));


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    const decoded = jwt.verify(token, secret);
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


app.listen(3000, () => {
  console.log("Server is running on port 3000");
})