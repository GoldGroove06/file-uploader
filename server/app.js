const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const passport = require("passport");
require("./config/passport");
const session = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const authRoute = require("./routes/authRoute")

const path = require("node:path");
const folderRoute = require('./routes/folderRoute');
const fileRoute = require('./routes/fileRoute');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);
app.use(passport.initialize());
app.use(passport.session());

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/auth/signin")
}

app.use("/auth", authRoute)

app.get("/", (req, res) => {
  res.render("homepage")
})

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.use("/folder", checkAuthenticated, folderRoute)
app.use("/file", checkAuthenticated, fileRoute)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})