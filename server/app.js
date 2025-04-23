const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const passport = require("passport");
require("./config/passport");
const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const {getFolder, getFiles } = require("./controllers/folderController")

const path = require("node:path");
const { get } = require('node:http');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    expressSession({
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
  app.use(passport.expressSession());

app.get("/", (req, res) => {
    res.send("arsh")
})

app.get("/folder/:id", getFolder)

app.get("/api/fetchfiles/", getFiles)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})